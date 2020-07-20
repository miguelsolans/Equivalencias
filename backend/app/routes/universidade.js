const express       = require('express');
const router        = express.Router();
const checkAuth     = require('../middleware/checkAuth');
const isAdmin       = require('../middleware/userAdmin');
const Universidades = require('../controllers/universidades');
const Processos     = require('../controllers/processos');

/**
 * Get University and respective Courses
 * query {university}: University name,
 * query {course}: Course name, returns available subjects
 * query {subject}: Subject name, returns similar processes for smart fields
 */
router.get('/', checkAuth, (req, res) => {

    const query = req.query;
    console.log("UNIVERSIDADES GET / ");

    if(query.university && typeof query.course === 'undefined' && typeof query.subject === "undefined") {
        Processos.universityCourses(query.university)
            .then(data => res.jsonp(data))
            .catch(err => res.status(500).jsonp(err));

    }
    else if((query.course && query.university) && typeof query.subject == 'undefined') {
        Processos.courseSubjects(query.university, query.course)
            .then(data => res.jsonp(data))
            .catch(err => res.status(500).jsonp(err));
    }
    else if(query.course && query.university && query.subject) {
        Processos.equivalenceSubject(query.university, query.course, query.subject)
            .then(data => res.jsonp(data))
            .catch(err => res.status(500).jsonp(err));
    }
    else {
        Universidades.list()
            .then(data => res.jsonp(data))
            .catch(err => res.jsonp(err));
    }


});

/**
 * Create a new University
 * body {codInstit} unique University identifier
 * body {nomeInstit} University name
 */
router.post('/', checkAuth, isAdmin, (req, res) => {
    console.log("UNIVERSIDADES POST / ");

    const university = {
        codInstit: req.body.codInstit,
        nomeInstit: req.body.nomeInstit
    };

    Universidades.addNew(university)
        .then(data => res.status(201).jsonp(data))
        .catch(err => {
            console.log(err);
            res.status(400).jsonp(err)
        });
});


router.delete('/:id', checkAuth, isAdmin, (req, res) => {
    console.log("UNIVERSIDADES DELETE / ");

    let id = req.params.id;

    Universidades.deleteUniversity(id)
        .then(data => res.status(200).jsonp(data))
        .catch(err => res.status(400).jsonp(err));
});

module.exports = router;
