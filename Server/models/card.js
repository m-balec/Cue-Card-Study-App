const mongoose = require('mongoose');


// Schema for cue card
const cardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Card', cardSchema);