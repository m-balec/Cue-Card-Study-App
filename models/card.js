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

// exporting module to use in seperate .js file
module.exports = mongoose.model('card', cardSchema);