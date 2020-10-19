const express = require('express');
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get('/books',apiController.getAllBooks);
router.get('/books/:id', apiController.getBookById);
router.post('/books', apiController.addNewBook);
router.put('/books/:id', apiController.updateBooks);
router.delete('/books/:id', apiController.deleteBook);

module.exports = router;