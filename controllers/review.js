const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/review.ejs", { listing });
};

module.exports.create = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Review added!");
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
};