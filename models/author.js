const mongoose = require('mongoose');
const Schema = mongoose.Schema

const authorSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 6
    },
    gender: {
        type: String,
    },
    country: {
        type: String
    }
}, {timestamps: true});

const Author =  mongoose.model('Author', authorSchema);
module.exports = Author;