const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");
const authorize = require('../middleware/authorize');

router.get("/" , bookController.home);
router.get("/createBook", bookController.createBooks_get);
router.post('/createBook',bookController.createBooks);
router.get("/viewBooks", bookController.viewBooks);
router.get('/viewBooks/:id', bookController.viewBooksById);

module.exports = router;