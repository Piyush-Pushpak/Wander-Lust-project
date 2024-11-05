const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingControllers = require("../controllers/listing.js");

// Index , Create
router.route("/")
    .get(wrapAsync(listingControllers.index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.create));
// New Route
router.get("/new", isLoggedIn, listingControllers.new);

// Show, Update, Delete
router.route("/:id")
    .get(wrapAsync(listingControllers.show))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.update))
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.delete));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.edit));

module.exports = router;