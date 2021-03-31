const Users = require('../models/users');


const viewAuthor = (req, res) => {
    const fullname = req.params.fullname;
    const authorId = req.params.id
    let isloggedin = false;

    

    Users.findById(authorId)
          .then(result => {
            if (req.user.id === authorId){
                isloggedin = true;
            } 
              res.render('ProfilePage', {title: 'home', result, isloggedin})
          })        
}

module.exports = {
    viewAuthor
}