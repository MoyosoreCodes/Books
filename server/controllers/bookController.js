const bookModel = require("../models/bookModel");

const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, `./uploads/`);
    },
    filename: (req, file, done) => {
        done(null, req.body.title +'CoverPAGE'+ file.originalname);
    } 
});

const uploads = multer({
    storage, 
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, done) => {
        if(!(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/JFIF')){
            done(null, false);
        }
        done(null, true);
    }
})


module.exports = {
    create: async (data) => {

        try {
            const createdBooks = await bookModel.create(data);
            return {
                status: 200,
                message: 'book creation successful',
                data: createdBooks
            }

        } catch (error) {
            console.log(error);

            return {
                status: 500,
                message: 'book creation error',
                data: error
            }
        }   
    },

    update: async (id, data) => {
        try {
            const foundbook = await bookModel.findOne({_id: id});
            if(!foundbooks) {
                return {
                    status: 400,
                    message: "book not found",
                    data: null
                }
            }

            const updatedBook = await bookModel.findByIdAndUpdate({_id: foundbook._id}, data);
            if (!updatedBook) {
                return {
                    status: 500,
                    message: "error updating book",
                    data: null
                }
            }

            return {
                status: 200,
                message: 'book update successful',
                data: updatedBook
            }
        } catch (error) {
            
        }
    },

    read: async (filter = {}) => {
        //remember to add query
        try {
            const foundBooks = await bookModel.find(filter);    
            return {
                status: 200,
                message: 'book(s) found',
                data: foundBooks
            }

        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Error',
                data: error
            }
        }
    },
    
    list: async () => {
        try {
            const books = await bookModel.find();
            return {
                status: 200,
                message: 'book(s) found',
                data: books
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Error',
                data: error
            }
        }
    },

    delete: async (data) => {
        try {
            const foundBook =  await bookModel.findOne({_id: data._id})
            const book = await bookModel.deleteOne(foundBook._id);
            if (!foundBook) {
                return {
                status: 400,
                message: "book deletion Failed",
                data: null
                }
            }
            return { message: "deleted successfully", status: 200 };
           
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Error',
                data: error
            }
        }
    }
}
/*
const home = (req, res) => {
    res.redirect("/")
 
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
*/