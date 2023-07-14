const express = require("express");
const router = express.Router();
const cardController = require("../controller/cardController");

// Get all cards/collections
router.get("/getCard", cardController.get);

// Add a new card/collection
router.post("/addCard", cardController.post);

// Delete a card/collection
router.delete("/deleteCard/:collectionId", cardController.delete);

module.exports = router;