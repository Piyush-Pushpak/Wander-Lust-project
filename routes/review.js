const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, validateReview, isAuthor } = require("../middleware.js");

const controllerReview = require("../controllers/review.js");

// Review

// Show, Create
router.route("/listings/:id/review")
    .get(controllerReview.show)
    .post(isLoggedIn, validateReview, wrapAsync(controllerReview.create));

// Delete
router.delete("/listings/:id/review/:reviewId", isLoggedIn, isAuthor, wrapAsync(controllerReview.delete));

module.exports = router;