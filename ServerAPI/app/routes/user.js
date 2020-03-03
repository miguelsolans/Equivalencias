const express = require('express');
const router = express.Router();

const Users = require('../controllers/users');

router.get('/:user', (req, res) => {
    // TODO: this route must be deleted, currently only being used for debugging purposes
    Users.searchUser(req.body.user)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

module.exports = router;