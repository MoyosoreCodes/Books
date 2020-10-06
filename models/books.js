const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    isbn: {
        type: Number,
        required: true,
        unique: true,
    }, 
    author: {
        type: String,
        required: true
    }, 
    publishDate: {
        type: Date,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
}, {timestamps : true});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;