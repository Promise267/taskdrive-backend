const Collection = require("../models/collection");
const Note = require("../models/note");
module.exports = {
    get : (req, res) => {
        const {id} = req.params;
        Note.find({collectionId:id}).then((note)=>{
            res.send(note);
        }).catch((err)=>{
            res.send(err);
        });
    },

    post : async (req, res) => {
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
    },

    patch : async (req, res) => {
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
    },

    delete : async(req, res)=>{
        const {id} = req.params;
        Note.deleteOne({ _id :  id})
            .then(() => {
                res.send("successfully deleted");
            })
            .catch((err) => {
                console.log(err);
            });
    }
}