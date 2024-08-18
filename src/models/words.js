const mongoose = require('mongoose')

const wordShema = new mongoose.Schema({
    word:{
        type: String,
        required: true
    },
    translation:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: ['Text', 'In Progress', 'Done'],
        default: 'Text'
    }
});

const Word = mongoose.model('Word', wordShema);
module.exports = Word;