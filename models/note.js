const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    date : String,
    collectionId : {type : mongoose.Schema.Types.ObjectId, ref : 'Collection'}
})

const Note = mongoose.model("Note", noteSchema);
module.exports = Note

