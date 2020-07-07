const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Users = require('../controllers/users');
const Hash = require('../utils/hasing');

const checkAuth = require('../middleware/checkAuth');
const userAdmin = require('../middleware/userAdmin');

/**
 * Get a Certain user by its ID
 * param {username}: username
 */
router.get('/logged', checkAuth, (req, res) => {
    console.log(`GET / ${req.decodedUser.username}`);

    Users.searchUser(req.decodedUser.username)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

/**  TODO: Refactor with ASYNC-AWAIT
 * Login endpoint
 * body {username}: account matching username
 * body {password}: account password
 */
router.post('/login', (req, res, next) => {

    const userAuth = {
        username: req.body.username,
        password: req.body.password
    };

    console.log(userAuth);

    Users.searchWithPassword(userAuth.username)
        .then(user => {

            if(!user){
                res.status(401).jsonp({title: "Error", message: `User ${userAuth.username} does not exists`});
            } else {
                bcrypt.compare(userAuth.password, user.password)
                    .then(result => {
                        if(!result) {
                            res.status(401).jsonp( {title: "error", message: "Invalid password!"} );
                        } else {
                            const token = jwt.sign({
                                    username: user.username
                                },
                                process.env.AUTH_SECRET, { expiresIn: process.env.AUTH_TOKEN_TIMETOLIVE },
                                { algorithm: process.env.AUTH_TOKEN_ALGORITHM }
                            );

                            const cookieOptions = {
                                httpOnly: true
                            };
                            res.cookie('userToken', token, cookieOptions);
                            res.status(201).jsonp( {title: "Success!", message: "User logged on successfully", token: token, user: {
                                    username: user.username,
                                    fullName: user.fullName,
                                    admin: user.admin
                                }});
                        }


                    })
                    .catch(err => res.status(401).jsonp(err));
            }
        })
        .catch(err => res.status(401).jsonp(err));

});

/**
 * Register a new username
 * body {username}: Account username (unique filed),
 * body {password}: Account password,
 * body {email}: Account email address,
 * body {fullName}: New user full name,
 * body {admin}: true if admin, false otherwise
 * Notes: must be admin to perform this action
 */
router.post('/register', (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) console.log(err);

        let admin = (req.body.admin == true);
        console.log(`Is admin: ${admin}`)
        const newUser = {
            username: req.body.username,
            password: hash,
            email: req.body.email,
            fullName: req.body.fullName,
            admin: admin
        };

        Users.newUser(newUser)
            .then(data => res.status(201).jsonp(data))
            .catch(err => res.status(400).jsonp(err));
    });

});

/**
 * Change own account password
 * body {oldPassword}: old account password,
 * body {newPassword}: new account password
 */
router.put('/password', checkAuth, async (req, res) => {
    let info = {
        username: req.decodedUser.username,
        oldPassword: req.body.oldPassword || req.body.oldpassword,
        password: req.body.newPassword || req.body.newpassword
    };
    try {
        let user = await Users.searchWithPassword(info.username);

        console.log(user);

        let state = bcrypt.compareSync(info.oldPassword, user.password);

        if(state) {
            let newPassword = await bcrypt.hash(info.password, 10);
            let update = await Users.changePassword(info.username, newPassword);

            res.status(201).jsonp({title: "Success!", message: "Password has been updated!"});

        } else {
            res.status(400).jsonp({title: "Error!", message: "Old password field doesn't match your actual old password"})
        }

    } catch(err) {
        res.status(400).jsonp({title: "Error!", message: "Some error occurred whilst changing password", error: err});
    }
});

/**
 * Delete an account. Will not work if the current account is set to admin
 * body {username}: account username
 */
router.delete('/', checkAuth, userAdmin, (req, res) => {

    Users.destroyUser(req.body.username)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});


module.exports = router;
