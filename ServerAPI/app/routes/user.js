const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const Users = require('../controllers/users');


router.get('/:username', (req, res) => {
    console.log(`GET / ${req.params.username}`);

    Users.searchUser(req.params.username)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

router.post('/login', (req, res, next) => {

    const userAuth = {
        username: req.body.username,
        password: req.body.password
    };

    console.log(userAuth);

    Users.searchUser(userAuth.username)
        .then(user => {

            if(!user){
                res.jsonp({title: "Error", message: `User ${userAuth.username} does not exists`});
            }

            bcrypt.compare(userAuth.password, user.password)
                .then(result => {
                    if(!result) {
                        res.jsonp( {title: "error", message: "Invalid password!"} );
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

                        res.jsonp( {title: "Success!", message: "User logged on successfully", token: token} );
                    }


                })
                .catch(err => res.jsonp(err));
        })
        .catch(err => res.jsonp(err));

});


router.post('/register', (req, res) => {
    console.log("USER POST /");

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        // TODO: Remove throw after tests
        if(err) console.log(err);

        const newUser = {
            username: req.body.username,
            password: hash,
            email: req.body.email,
            fullName: req.body.fullName
        };

        Users.newUser(newUser)
            .then(data => res.jsonp(data))
            .catch(err => res.jsonp(err));
    });

});


router.delete('/', (req, res) => {

    Users.destroyUser(req.body.username)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

module.exports = router;