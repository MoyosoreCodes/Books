var Books = require("../models/books");


const getAllBooks = (req, res) => {
    Books.find().then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

const getBookById = (req, res) => {
    Books.findById({ _id : req.params.id})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

const addNewBook = (req, res) => {
    Books.create(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

const updateBooks = (req, res) => {
    Books.findByIdAndUpdate({_id : req.params.id}, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

const deleteBook = (req, res) => {
    Books.findByIdAndRemove({ _id : req.params.id}).then((result) => {
        res.send(result);
    })
};

module.exports = {
    getBookById, 
    addNewBook,
    getAllBooks,
    updateBooks,
    deleteBook
}
