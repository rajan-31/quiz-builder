const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    _id: String,
    owner: mongoose.Schema.Types.ObjectId,
    questions: [{
        text: String,
        typeOfQuestion: Number,
        options: [{
            type: String
        }],
        correctOptions: [{
            type: String
        }],
        _id: false
    }]

});

module.exports = mongoose.model('Quiz', quizSchema);