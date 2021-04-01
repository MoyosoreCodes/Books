const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


        
const Authenticate = (req, res, next) => {
    if (!req.isAuthenticated()){        
        return res.status(401).redirect('/accounts/login');
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
        if(!(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/JFIF')){
            done(null, false);
        }
        done(null, true);
    }
})


router.get("/", bookController.home);
router.get("/createBook", Authenticate , bookController.createBooks_get);
router.post('/createBook', Authenticate , uploads.single('productImage') ,bookController.createBooks);
router.get("/viewBooks" ,  uploads.single('productImage') , bookController.viewBooks);
router.get('/viewBooks/:id' , uploads.single('productImage') , bookController.viewBooksById);
router.post('/search', uploads.single('productImage'), bookController.search)

module.exports = router;