const mongoose = require('mongoose');

const memeschema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id:Number,
    name: String,
    caption: String,
    url: String
});

module.exports = mongoose.model('Meme', memeschema);