const jwt = require('jsonwebtoken');
const Users = require('../controllers/users');
const Error = require('../utils/error');

module.exports = async (req, res, next) => {

    try {
        const token = req.headers.usertoken || req.headers.userToken;

        const decodedToken = jwt.verify(token, process.env.AUTH_SECRET, { algorithm: 'RS256' });

        let user = await Users.findById(decodedToken.user);

        if(!user) {
            throw new Error(401, "Error!", "Invalid credentials");

        } else {
            req.decodedUser = {
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                admin: user.admin
            };

            next();
        }
    } catch(err) {
        let error = new Error(401, "Error!", "Authentication Failed");
        error.setErrorStack(err);
        res.status(error.getHttpCode()).jsonp(error.getBody())
    }
};
