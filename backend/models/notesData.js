const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    tags: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const notes = mongoose.model('Notes',noteSchema);
module.exports = notes;