const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');

const Users = require('../controllers/users');

router.get('/:username', (req, res) => {
    console.log(`GET / ${req.params.username}`);

    Users.searchUser(req.params.username)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

router.post('/', (req, res) => {

    Users.newUser(req.body)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});


router.delete('/', (req, res) => {

    Users.destroyUser(req.body.username)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

module.exports = router;