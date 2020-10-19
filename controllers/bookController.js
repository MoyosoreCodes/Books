var Book = require("../models/books");

const home = (req, res) => {
    res.redirect("/books/viewbooks");
};

const createBooks_get = (req, res) => {
    res.render("newbooks", { title: "New Book"});
};

const createBooks = (req, res) => {
    const book = new Book(req.body);

    book.save()
        .then((result) => {
            res.redirect('/books/viewBooks');
        })
        .catch((err) => {
            console.log(err);
        });
};

const viewBooks = (req , res) => {
    const books = Book.find()
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