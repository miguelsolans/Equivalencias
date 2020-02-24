const express = require('express');
const router = express.Router();

const Processos = require('../controllers/processos');

router.get('/', (req, res) => {

    Processos.list()
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));

});

module.exports = router;