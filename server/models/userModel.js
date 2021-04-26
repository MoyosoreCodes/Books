const mongoose = require('mongoose');
const Schema = mongoose.Schema

const user_types = {
    READER: 'READER',
    ADMIN: 'ADMIN',
    AUTHOR: 'AUTHOR',
    CLIENT: 'CLIENT'
}

const GenericUserObject = {
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        default: user_types.CLIENT
    }
}

const readerObject = GenericUserObject;
readerObject.user_type.default = user_types.READER
const readerSchema = new Schema (readerObject, {timestamps: true});

const adminObject = GenericUserObject;
adminObject.user_type.default = user_types.ADMIN
const adminSchema = new Schema (adminObject, {timestamps: true});


const customUserObject = GenericUserObject;
//customUserObject.user_type.default = user_types.CLIENT
const customUserSchema = new Schema (customUserObject, {timestamps: true});

const authorObject = GenericUserObject;
authorObject.user_type.default = user_types.AUTHOR
const authorSchema = new Schema (authorObject, {timestamps: true});




const Author =  mongoose.model('Author', authorSchema, 'users');
const CustomUser =  mongoose.model('CustomUser', customUserSchema, 'users');
const Readers =  mongoose.model('Readers', readerSchema, 'users');
const Admin =  mongoose.model('Admin', adminSchema, 'users');


module.exports = {
    Readers, Admin,CustomUser, Author, 
};