const User = require('../models/users');
const jwt = require('jsonwebtoken');
const handleError = require('../middleware/errors')


const getLogin = (req, res) => {
    res.render('login', {title: 'Login'});
};

const getSignup = (req, res) => {
     res.render('signup', {title: 'Signup'});
};

const maxAge =  24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'somekindasecret', {
        expiresIn: maxAge
    });
};


const postSignup = async (req, res) => {

    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true,  maxAge : maxAge * 1000});
        res.json({user: user._id});
    } catch (err) {
        const errors = handleError(err);
        res.json({ errors });
    }
};

const postLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.checkLogin(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.json({user : user._id});
    } catch (err) {
        const error = handleError(err);
        res.json({ error });
    }
}

module.exports ={
    getLogin,
    getSignup,
    postSignup,
    postLogin
}