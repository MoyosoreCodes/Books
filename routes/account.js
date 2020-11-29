const express = require('express');
const { body } = require('express-validator');
const passport = require('passport');
const router = express.Router();
const accountController = require('../controllers/accountControllers');
const Users = require('../models/users');

const isAuthorized = (req, res, next) => {
    if (req.isAuthenticated()){        
        return res.redirect('/books/viewBooks');
    }
    next();
};

router.get('/signup', isAuthorized, accountController.getSignup);

router.get('/login', isAuthorized, accountController.getLogin);

router.post(
    '/signup',
    [       
            body('firstname')
                .isLength({min:1})
                .withMessage('Firstname is required'),
            body('lastname')
                .isLength({min:1})
                .withMessage('Lastname is required'), 
            body('password')
                .isLength({min: 6})
                .withMessage('Password length is 6 characters long'),
            body('email')
                .isEmail()
                .custom( async (email) => {
                    const user = await Users.findOne({email});
                    if (user){
                        throw new Error('Email has been registered');
                    }
                })
                .withMessage('invalid email')
    ], 
    accountController.postSignup);

router.post('/login', passport.authenticate('local', {
        failureFlash: true, 
        failureRedirect: '/accounts/login',
        successRedirect: '/'
    })
);


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})



module.exports = router;