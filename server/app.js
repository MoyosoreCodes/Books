const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server)
const dbUri = process.env.DBURI || "mongodb://localhost:27017/Bookdb";
const port =  process.env.PORT || 5000;


//Run when client connects
io.on('connection', (socket) => {
    console.log('new user connection');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})


mongoose.connect(dbUri, { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false, useCreateIndex: true})
    .then(() => {
        console.log('Connection Succesful');
        server.listen(port, () => {
            console.log(`listening at ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

//app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'somerandomsecret',
    saveUninitialized: false, 
    resave: true,
    cookie: { maxAge: 20000}
    })
);
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.get('/', () => {
    console.log('server is up and running');
    socket.on
})

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
    done(null, json.parse(user));
});

passport.deserializeUser((user ,done)=> {
    done(null, user)
});


app.use('/books', require('./routes/books'));

//app.use('/api', require('./routes/api'));
//app.use('/authors', require('./routes/author'));
//app.use('/accounts', require('./routes/account'));