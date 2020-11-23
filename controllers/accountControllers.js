const User = require('../models/users');
const bcrypt = require('bcrypt');
const {body, validationResult} =  require('express-validator');




const getLogin = (req, res) => {
    const errors = req.flash('error');
    const success = req.flash('success')
    console.log(success)
    res.render('login', {title: 'Login', errors, success});
};

const getSignup = (req, res) => {
    const errors = req.flash('error');
     res.render('signup', {title: 'Signup', errors});
};
/*
const maxAge =  24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'somekindasecret', {
        expiresIn: maxAge
    });
};
*/

const postSignup = async (req, res) => {

    try {
        const errors = validationResult(req);
       
        if(!errors.isEmpty()) {
            const errors =  validationResult(req)
            console.log(errors);

            const errorMessage = []
            errors.array().map(err => errorMessage.push({[err.param]: err.msg}))

            console.log(errorMessage);
            req.flash('error', errorMessage)
            return res.redirect('/accounts/signup'); 

        }

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
        
        return res.redirect('/accounts/login');

   
    } catch (err) {
        console.log(err)
    }
};
/*
const postLogin =(req, res) => {

    res.redirect('/books/viewBooks');
/*
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });

        if(!user) {
            console.log('user not found')
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {  
            console.log('Invalid password');
            return res.status(401).redirect('/')
        }

        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        return res.status(200).redirect('/books/viewBooks')
    } catch(err) {
        console.log(err);
    }

};
*/
module.exports ={
    getLogin,
    getSignup,
    postSignup
}