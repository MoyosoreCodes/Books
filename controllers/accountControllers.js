const User = require('../models/users');
const jwt = require('jsonwebtoken');

const handleError = (err) => {
    console.log(err.message, err.code);
    
    let errors = {
        firstname: '', 
        lastname: '',
        email: '',
        password: '',
        country: ''
    };

    if (err.message === 11000){
        errors.email = "That isbn has already been registered";
    }
    

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;   
        });
    }
    return errors
};

const getLogin = (req, res) => {
    res.render('login', {title: 'Login'});
};

const getSignup = (req, res) => {
     res.render('signup', {title: 'Signup'});
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'somekindasecret', {
        expiresIn: maxAge
    });
};

const postSignup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true,  maxAge : maxAge * 1000})
        res.json({user: user._id});
    } catch (err) {
        const errors = handleError(err);
        res.json({ errors });
    }
};

const postLogin = async (req, res) => {
    console.log(req.body)
    res.send('user login');
}

module.exports ={
    getLogin,
    getSignup,
    postSignup,
    postLogin
}