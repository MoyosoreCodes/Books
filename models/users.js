const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema ({
    firstname: {
        type: String,
        required: [true, "Enter your fisrtname"]
    },
    lastname: {
        type: String,
        required: [true, "Enter your lastname"]
    },
    email: {
        type: String, 
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    gender: {
        type: String,
    },
    country: {
        type: String, 
        required: [true, 'Country must be specified']
    }
}, {timestamps: true});


const Users =  mongoose.model('User', userSchema);
module.exports = Users;