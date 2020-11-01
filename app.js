const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authorize = require('./middleware/authorize');
const app = express();


const dbUri = process.env.MONGODB_URI || "mongodb+srv://Moyosore:Moyosore12@cluster0.ky9jk.mongodb.net/books?retryWrites=true&w=majority";
const port = 5000;


mongoose.connect(dbUri, { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false, useCreateIndex: true})
    .then((result) => {
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
app.use('/api', require('./routes/api'));
app.use('/books', authorize.Authorize , require('./routes/web'))
app.use('/accounts', require('./routes/account'));