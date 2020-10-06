const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();


const dbUri = "mongodb+srv://Moyosore:Moyosore12@cluster0.ky9jk.mongodb.net/books?retryWrites=true&w=majority";
const port = 5000;


mongoose.connect(dbUri, { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false})
    .then((result) => {
        console.log('Connection Succesful');
        app.listen(port, () => {
            console.log(`listening at ${port}`);
        })
    })
    .catch((err) => {
        console.log(err);
    });
app.use(bodyParser.json())
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
app.use('/api', require('./routes/api'));






/*
app.get("/", (req, res) => {
    res.render("layout", { title: "Home"});
});

app.get("/createBook", (req, res) => {
    res.render("newbooks", { title: "New Book"});
});

app.get("/viewBooks", (req , res) => {
    res.render("viewBooks", {title: "View"});
});
*/