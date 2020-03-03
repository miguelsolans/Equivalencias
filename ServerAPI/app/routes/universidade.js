const express = require('express');
const router  = express.Router();

const Universidades = require('../controllers/universidades');

router.get('/', (req, res) => {
    console.log("UNIVERSIDADES GET / ");
    Universidades.list()
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

router.post('/', (req, res) => {
    console.log("UNIVERSIDADES POST / ");
    Universidades.addNew(req.body.name)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

router.get('/:id/courses', (req, res) => {
    console.log(`/ GET ${req.params.id} Courses`);
    Universidades.getUniversityCourses(req.params.id)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

module.exports = router;