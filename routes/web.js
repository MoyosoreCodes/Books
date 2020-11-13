const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


        
const ensureAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()){        
        return res.redirect('/accounts/login');
    }
    next();
};

const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, `./uploads/`);
    },
    filename: (req, file, done) => {
        done(null, req.body.title +'CoverPAGE'+ file.originalname);
    } 
});

const uploads = multer({
    storage, 
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, done) => {
        if(!(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')){
            done(null, false);
        }
        done(null, true);
    }
})


router.get("/", ensureAuthenticated , bookController.home);
router.get("/createBook", ensureAuthenticated , bookController.createBooks_get);
router.post('/createBook', ensureAuthenticated , uploads.single('productImage') ,bookController.createBooks);
router.get("/viewBooks" , ensureAuthenticated ,  uploads.single('productImage') , bookController.viewBooks);
router.get('/viewBooks/:id', ensureAuthenticated , uploads.single('productImage') , bookController.viewBooksById);

module.exports = router;