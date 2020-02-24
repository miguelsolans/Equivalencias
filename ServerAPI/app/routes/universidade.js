const express = require('express');
const router = express.Router();

const Universidades = require('../controllers/universidades');

router.get('/', (req, res) => {
    Universidades.list()
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});



module.exports = router;