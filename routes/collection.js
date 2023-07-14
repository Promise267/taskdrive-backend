const express = require("express");
const router = express.Router();
const collectionController = require("../controller/collectionController")

//get all the notes of a collection
router.get("/:id", collectionController.get);
//post to note
router.post("/:id/newnote", collectionController.post);
//edit note
router.patch("/:id/editNote", collectionController.patch);
//deletenote
router.delete("/:id/deleteNote", collectionController.delete)

module.exports = router