const Collection = require("../models/collection");
module.exports = {
    get : (req, res) => {
        Collection.find()
            .then((collection) => {
                res.send(collection);
            })
            .catch((err) => {
                res.send(err);
            });
    },

    post : (req, res) => {
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
    },

    delete : (req, res) => {
        Collection.deleteOne({ _id: req.params.collectionId })
            .then(() => {
                res.send("Successfully deleted");
            })
            .catch((err) => {
                console.log(err);
            });
    }
}