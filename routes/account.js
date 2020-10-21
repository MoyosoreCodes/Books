const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountControllers');

router.get('/signup', accountController.getSignup);
router.get('/login', accountController.getLogin);
router.post('/signup', accountController.postSignup);
router.post('/login', accountController.postLogin);

module.exports = router;