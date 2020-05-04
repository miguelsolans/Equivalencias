const express       = require('express');
const router        = express.Router();
const checkAuth     = require('../middleware/checkAuth');
const Universidades = require('../controllers/universidades');
const Processos     = require('../controllers/processos');

router.get('/',  checkAuth, (req, res) => {
    console.log("UNIVERSIDADES GET / ");
    Universidades.list()
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

router.post('/', checkAuth, (req, res) => {
    console.log("UNIVERSIDADES POST / ");

    const university = {
        codInstit: req.body.codInstit,
        nomeInstit: req.body.nomeInstit
    };

    Universidades.addNew(university)
        .then(data => res.status(201).jsonp(data))
        .catch(err => res.status(401).jsonp(err));
});

router.get('/:name/courses', (req, res) => {

    Processos.universityCourses(req.params.name)
        .then(data => res.status(200).json(data))
        .catch(err => res.json(err));
});
// router.get('/:id/courses', checkAuth, (req, res) => {
//     console.log(`/ GET ${req.params.id} Courses`);
//     Universidades.getUniversityCourses(req.params.id)
//         .then(data => res.jsonp(data))
//         .catch(err => res.jsonp(err));
// });

router.post('/:id', checkAuth, (req, res) => {


});


module.exports = router;
