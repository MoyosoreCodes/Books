const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    productImage:{
        type: String
    },
    title: {
        type: String,
        required: [true, 'You have not entered a book title']
    }, 
    isbn: {
        type: Number,
        required: [true, 'isbn number is required'],
        unique: true,
    }, 
    author: {
        type: String,
        required: true
    }, 
    publishDate: {
        type: Date,
        default: Date.now().toString()
    }, 
    price: {
        type: Number,
        required: [true, 'Price must be Entered']
    }, 
    genre: {
        type: String
    }, 
    description: {
        type: String,
        default: "No description added"
    }
}, {timestamps : true});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;