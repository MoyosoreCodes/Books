const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userModel = {
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
    }
}
const userSchema = new Schema (userModel, {timestamps: true});

mongoose.plugin(require('mongoose-autopopulate'));

const Users =  mongoose.model('User', userSchema, 'users');
module.exports = Users;