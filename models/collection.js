const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
