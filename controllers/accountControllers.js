const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const handleLoginError = (err) => {
    console.log(err.message, err.code);
    
    let errors = {
        firstname: '', 
        lastname: '',
        email: '',
        password: '',
        country: ''
    };

    if (err.code === 11000){
        errors.email = "That email has already been registered";
    }
    
    if (err.message === 'Incorrect Username') {
        errors.email = 'That email is not registered';
    }

    if (err.message === 'Incorrect Password') {
        errors.password = 'Password is incorrect';
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

const maxAge =  24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'somekindasecret', {
        expiresIn: maxAge
    });
};


const postSignup = async (req, res) => {

    try {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            country: req.body.country
        });

        const hashedPassword = await bcrypt.hash(newUser.password, 8);
        newUser.password = hashedPassword;

        await newUser.save();
        res.redirect('/accounts/login')
/*
        const token = createToken(newUser._id);
        res.cookie('jwt', token, {httpOnly: true,  maxAge : maxAge * 1000});
*/      
    } catch (err) {
        console.log(err)
    }
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });

        if(!user) {
            console.log('user not found')
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {  
            console.log('Invalid password');
            return res.redirect('/')
        }

        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        return res.json({user : user._id});
    } catch(err) {
        console.log(err);
    }
};

module.exports ={
    getLogin,
    getSignup,
    postSignup,
    postLogin
}