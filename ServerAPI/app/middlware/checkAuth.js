const jwt = require('jsonwebtoken');
const Users = require('../controllers/users');

module.exports = (req, res, next) => {

    try {
        const token = req.cookies.userToken;

        const decodedToken = jwt.verify(token, process.env.AUTH_SECRET, { algorithm: 'RS256' });

        Users.searchUser(decodedToken.username)
            .then(user => {
                if(!user){
                    res.jsonp( {title: "Error!", message: "Invalid credentials"} );
                } else {
                    req.decodedUser = user.username;

                    console.log(`${req.decodedUser} logged on`);

                    next();
                }
            })
            .catch(err => res.jsonp(err));

    } catch(err) {
        res.jsonp( { title: "Error!", message: "Authentication failed!", error: err} );
    }
};