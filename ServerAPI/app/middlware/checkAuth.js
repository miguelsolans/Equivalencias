const jwt = require('jsonwebtoken');
const Users = require('../controllers/users');

module.exports = (req, res, next) => {

    console.log("Auth...");

    try {
        const token = req.cookies.userToken;
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.AUTH_SECRET, { algorithm: 'RS256' });


        Users.searchUser(decodedToken)
            .then(user => {
                if(!user.length)
                    res.jsonp( {title: "Error!", message: "Invalid credentials"} );
                else {
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