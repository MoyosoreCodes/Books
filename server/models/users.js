const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema ({
    firstname: {
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
        required: true
    },
    gender: {
        type: String,
    },
    country: {
        type: String, 
        required: true
    }
}, {timestamps: true});


const Users =  mongoose.model('User', userSchema);
module.exports = Users;