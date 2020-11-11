const express = require('express');
const passport = require('passport');
const router = express.Router();
const accountController = require('../controllers/accountControllers');

router.get('/signup', accountController.getSignup);
router.get('/login', accountController.getLogin);
router.post('/signup', accountController.postSignup);
router.post('/login',passport.authenticate('local', {
    failureFlash: true, 
    failureRedirect: '/accounts/login'
}), accountController.postLogin);



module.exports = router;