var Book = require("../models/books");

const home = (req, res) => {
    res.redirect("/books/viewbooks");
};

const createBooks_get = (req, res) => {
    const errors = req.flash().error || [];
    res.render("newbooks", { title: "New Book", errors});
};

const createBooks = (req, res) => { 
    const book = new Book({
        productImage: req.file.path,
        title: req.body.title,
        isbn: req.body.isbn,
        author: req.user.fullname,
        publishDate: req.body.publishDate,
        price: req.body.price,
        genre: req.body.genre,
        description: req.body.description
    });

    book.save()
        .then( () => {
           res.redirect('/books/viewBooks');
        })
        .catch((err) => {
            console.log(err);
        });
};

const viewBooks = (req , res) => {
     Book.find()
        .then((result) => {
            res.render("viewBooks", {title: "View", books: result});
        })
        .catch((err) => {
            console.log(err);
        }); 
};

const viewBooksById = (req, res) => {
    const id = req.params.id;
    Book.findById(id)
        .then((result) => {
            res.render('details', {title: "Details", details: result});
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    home, 
    createBooks_get,
    createBooks,
    viewBooks,
    viewBooksById
}