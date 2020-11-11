const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");

const ensureAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()){        
        return res.redirect('/accounts/login');
    }
    next();
}


router.get("/", ensureAuthenticated , bookController.home);
router.get("/createBook", ensureAuthenticated , bookController.createBooks_get);
router.post('/createBook', ensureAuthenticated ,bookController.createBooks);
router.get("/viewBooks" , ensureAuthenticated , bookController.viewBooks);
router.get('/viewBooks/:id' , ensureAuthenticated , bookController.viewBooksById);

module.exports = router;