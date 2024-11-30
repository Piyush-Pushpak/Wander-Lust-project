if (process.env.NOde_ENV != "production") {
    require('dotenv').config();
}

const Listing = require("./models/listing.js");
const wrapAsync = require("./utils/WrapAsync.js");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStartegy = require("passport-local");
const User = require("./models/user.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");

const app = express();

const dburl = process.env.MONGOATLAS_KEY;

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join((__dirname, "public"))));

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in Mongo Session store", err);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
    },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings", listings);
app.use("/", reviews);
app.use("/", users);

app.get('/search', wrapAsync(async (req, res) => {
    const search = req.query.search.trim();
    const Listings = await Listing.find({
        location: { $regex: new RegExp(search, 'i') }
    });
    if (Listings.length == 0) {
        req.flash("error", "No listing is present for your search!");
        return res.redirect("/listings");
    }
    res.render("./listings/filter.ejs", { Listings });
}));


app.get('/:text', wrapAsync(async (req, res) => {
    const text = req.params.text;
    const Listings = await Listing.find({ locationType: text });
    if (Listings.length == 0) {
        req.flash("error", "No listing is present for your filter!");
        return res.redirect("/listings");
    }
    res.render("./listings/filter.ejs", { Listings });
}));

app.all("*", (req, res, next) => {
    next(new expressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("./listings/error.ejs", { message })
})

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});