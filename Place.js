const mongoose = require("mongoose")

const place = mongoose.Schema({
	title: String,
	description: String,
    rating: Number,
    ratingNumbers: Number,
    image: String,
    category: String,
    address: String,
    features: String,
    website: String
})

module.exports = mongoose.model("place", place, "places");