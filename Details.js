const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const DetailsSchema = new Scheme({
    email: String
});

module.exports = mongoose.model("Details", DetailsSchema ,"places");