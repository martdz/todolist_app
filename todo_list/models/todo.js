var mongoose = require("mongoose");

//Setup Schema

var TodoSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model("Todo", TodoSchema);


