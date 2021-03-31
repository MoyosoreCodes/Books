const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const multer = require('multer');

const Authenticate = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/accounts/login');
    }
    next();
}

router.get('/:fullname/:id', Authenticate, authorController.viewAuthor);


module.exports = router