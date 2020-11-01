var Book = require("../models/books");


const handleBookErrors = (err) => {
    let errors = {
        title: '',
        isbn: '',
        publishDate: '',
        price: '',
    };

    if (err.message === 11000){
        errors.isbn = "That isbn has already been registered";
    }

    if ( err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors
};

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
            const errors = handleBookErrors(err);
            res.json({ errors });
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