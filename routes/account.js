const express = require('express');
const passport = require('passport');
const router = express.Router();
const accountController = require('../controllers/accountControllers');

const Authenticate = (req, res, next) => {
    if (req.isAuthenticated()){        
        return res.redirect('/books/viewBooks');
    }
    next();
};

router.get('/signup', Authenticate, accountController.getSignup);
router.get('/login', Authenticate, accountController.getLogin);
router.post('/signup', accountController.postSignup);
router.post('/login',passport.authenticate('local', {
    failureFlash: true, 
    failureRedirect: '/accounts/login'
}), accountController.postLogin);



module.exports = router;