var Books = require("../models/books");


exports.getAllBooks = (req, res) => {
    Books.find().then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.getBookById = (req, res) => {
    Books.findById({ _id : req.params.id})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.addNewBook = (req, res) => {
    Books.create(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.updateBooks = (req, res) => {
    Books.findByIdAndUpdate({_id : req.params.id}, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.deleteBook = (req, res) => {
    Books.findByIdAndRemove({ _id : req.params.id}).then((result) => {
        res.send(result);
    })
};

