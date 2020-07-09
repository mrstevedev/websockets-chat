// Create Mongo Schema 
const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true]
    },
    room : {
        type: String,
        required: [true]
    },
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Messages", MessageSchema);