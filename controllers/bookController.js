var Book = require("../models/books");

const home = (req, res) => {
    res.redirect("/books/viewbooks")
 
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
        author: req.body.author,
        publishDate: req.body.publishDate,
        price: req.body.price,
        genre: req.body.genre,
        description: req.body.description,
        createdBy: { 
            fullname: req.user.fullname,
            id: req.user.id
        }
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
    const genre = req.query.genre
    if (!genre){
        Book.find()
        .exec()
        .then(result => {
            return res.render("viewBooks", {title: "View", books: result});
        })
        .catch(err => {
            console.log(err);
        });
    }
    Book.find()
    .where('genre', genre)
    .then(result => {
    return res.render("viewBooks", {title: "View", books: result})
    })
    .catch(err =>{
        console.log(err);
    });
            
};


const viewBooksById = (req, res) => {
    const id = req.params.id;
    Book.findById(id)
        .then((result) => {
            return res.render('details', {title: "Details", details: result});
        })
        .catch((err) => {
            console.log(err);
        });
};

const search = (req, res) => {
    const searchInput = req.body.searchInput
    Book.find(
        {$text: { $search: searchInput}}
    )
        .then( result => {
            return res.status(200).json({result});
            return res.render("viewBooks", {title: "View", books: result});
        })
        .catch(err => {
            res.status(500).json({err});
            console.log(err);
        })
}

module.exports = {
    home, 
    createBooks_get,
    createBooks,
    viewBooks,
    viewBooksById,
    search
}