const jwt = require('jsonwebtoken');

const Authorize = (req, res, next) => {
    const token  =  req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'somekindasecret', (err, decodedToken) => {
            if (err){
                //console.log(err.message);
                res.redirect('/login');
            }else {
                //console.log(decodedToken)
                next();
            }
        })
    }else {
        res.redirect('/accounts/login')
    }
};

module.exports = {
    Authorize
}