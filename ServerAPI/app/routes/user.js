const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');

const Users = require('../controllers/users');

router.get('/:username', (req, res) => {
    console.log(`GET / ${req.params.username}`);

    bcrypt.
    Users.searchUser(req.params.username)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

router.post('/', (req, res) => {
    console.log("USER POST /");

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        // TODO: Remove throw after tests
        if(err) throw err;

        console.log(`PASSWORD HASHED: ${hash}`);
        // {username, password, email}
        const newUser = {
            username: req.body.username,
            password: hash,
            email: req.body.email
        }

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