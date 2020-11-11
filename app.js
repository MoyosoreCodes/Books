const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users');
const bcrypt = require('bcrypt');
const app = express();


const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/Bookdb";
const port = 5000;


mongoose.connect(dbUri, { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false, useCreateIndex: true})
    .then(() => {
        console.log('Connection Succesful');
        app.listen(port, () => {
            console.log(`listening at ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) =>{
    res.redirect('/books/viewBooks');
});

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'somerandomsecret',
    saveUninitialized: false, 
    resave: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async ( req, username, password, done) => {
        const user = await User.findOne({ email: username });

        if (!user) {
            return done(null, false, req.flash('error', "User Doesn't Exist"));
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match){
            return done(null, false, req.flash('error', "Incorrect password"));
        }

        return done(null, user);
    }
));

passport.serializeUser( (user, done) =>{
    done(null, {id: user._id, fullname: user.firstname +" "+ user.lastname});
});

passport.deserializeUser((user ,done)=> {
    done(null, user)
});


app.use('/api', require('./routes/api'));
app.use('/books', require('./routes/web'))
app.use('/accounts', require('./routes/account'));