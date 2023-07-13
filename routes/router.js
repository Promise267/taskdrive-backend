const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");
const Note = require("../models/note");

//post to note

router.post("/collection/:id/newnote", async (req, res) => {
    try {
    const { id } = req.params; 
    const collection = await Collection.findById(id);
    if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
    }
    
    const { title, description, date } = req.body; 

    const newNote = new Note({
        title,
        description,
        date,
        collectionId: id 
    });

    await newNote.save();
    res.send("Note created successfully")
    } catch (error) {
        res.send(error)
    }
});

//edit note
router.patch("/collection/:id/editNote", async (req, res) => {
    try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await Note.findById(id);
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
    if (title) {
        note.title = title;
    }
    if (description) {
        note.description = description;
    }

    await note.save();
    res.send("Note updated successfully");
    } catch (error) {
    res.send(error);
    }
});


//deletenote
router.delete("/collection/:id/deleteNote", async(req, res)=>{
    const {id} = req.params;
    Note.deleteOne({ _id :  id})
        .then(() => {
            res.send("successfully deleted");
        })
        .catch((err) => {
            console.log(err);
        });
})


//get all the notes of a collection
router.get("/collection/:id", (req, res) => {
    const {id} = req.params;
    Note.find({collectionId:id}).then((note)=>{
        res.send(note);
    }).catch((err)=>{
        res.send(err);
    });
})

// Get all cards/collections
router.get("/getCard", (req, res) => {
    Collection.find()
        .then((collection) => {
            res.send(collection);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Add a new card/collection
router.post("/addCard", (req, res) => {
    const newCollection = new Collection({
        name: req.body.name,
        description: req.body.description
    });

    newCollection.save()
        .then(() => {
            res.send("Successfully added Collection");
        })
        .catch((err) => {
            res.send(err);
        });
});

// Delete a card/collection
router.delete("/deleteCard/:collectionId", (req, res) => {
    Collection.deleteOne({ _id: req.params.collectionId })
        .then(() => {
            res.send("Successfully deleted");
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
