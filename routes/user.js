const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const controllerUser = require("../controllers/user.js");

// Show Signup page, Signup
router.route("/signup")
    .get(controllerUser.showSignup)
    .post(WrapAsync(controllerUser.signup));

// Show Login page,  Login
router.route("/login")
    .get(controllerUser.showLogin)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), controllerUser.login);

// Logout
router.get("/logout", controllerUser.logout);

module.exports = router;