const express = require('express');
const router = express.Router();
const Book = require('../models/books');

router.get('/books', (req, res) => {
    Book.find().then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get('/books/:id', (req, res) => {
    Book.findById({ _id : req.params.id})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/books', (req, res) => {
    Book.create(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put('/books/:id', (req, res) => {
    Book.findByIdAndUpdate({_id : req.params.id}, req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.delete('/books/:id', (req, res) => {
    Book.findByIdAndRemove({ _id : req.params.id}).then((result) => {
        res.send(result);
    })
});

module.exports = router;