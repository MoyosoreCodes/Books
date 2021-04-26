const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookObject = {
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
        type: String
    }, 
    publishDate: {
        type: String,
        default: new Date()
    }, 
    price: {
        type: Number,
        default: 0
        //required: [true, 'Price must be Entered']
    }, 
    tags: {
        type: [String],
        lowercase:true
    }, 
    description: {
        type: String,
        default: "No description added"
    }, 
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        autopopulate: true
    },
    likes: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [String]
    }
}

const bookSchema = new Schema(bookObject, {timestamps : true});
mongoose.plugin(require('mongoose-autopopulate'));

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;