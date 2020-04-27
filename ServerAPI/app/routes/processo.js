const express = require('express');
const router  = express.Router();

const Processos = require('../controllers/processos');

const pdf = require('../utils/pdf');

const checkAuth = require('../middleware/checkAuth');


/**
 * Get Students Enrolled
 */
router.get('/', checkAuth, (req, res) => {
    let query = req.query;

    if(query.year) {
        console.log(`GET / ?year=${query.year}`);
        Processos.searchByYear(query.year)
            .then(data => res.jsonp(data))
            .catch(err => res.jsonp(err));
    } else {
        Processos.list(null, { processo: true, idAluno: true, nomeAluno: true })
            .then(data => res.jsonp(data))
            .catch(err => res.jsonp(err));
    }

});

router.get('/:id', checkAuth, (req, res) => {
    let idProcesso = req.params.id;

    Processos.findProcessById(idProcesso)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
});

router.post('/:id/generate', checkAuth, (req, res) => {
    let idAluno = req.params.id;

    Processos.findProcessById( idAluno )
        .then(data => {
            console.log("DATA FETCHED...Passing to utils now");

            let result = pdf.makePdf(data, req.decodedUser);

            let msgOutput = result ? "Successfully generated" : "Some error occurred...";

            res.status(201).jsonp( {title: "Success!", message: msgOutput} );
        })
        .catch(err => res.jsonp( {title: "Error!", message: "Some error occurred while generating a PDF output", error: err} ));
});

/**
 * Create a new Student
 */
router.post('/', checkAuth, (req, res) => {

    console.log(req.body);

    const newProcess = {
        processo: req.body.processo,
        idAluno: req.body.idAluno,
        nomeAluno: req.body.nomeAluno,
        instProv: req.body.instProv,
        cursoProv: req.body.cursoProv,
        initiatedBy: req.decodedUser.username
    };

    Processos.new(newProcess)
        .then(data => res.status(201).jsonp(data))
        .catch(err => res.jsonp(err));

});

/**
 * Delete a student given by his ID
 */
router.delete('/:id', checkAuth, (req, res) => {
    console.log(req.params.id);

    Processos.delete(req.params.id)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));

});

/**
 * Add Subjects to Student
 */
router.put('/:id', checkAuth, (req, res) => {
    // semUcEquiv: STRING,
    // anoUcEquiv: STRING,
    // ucEquiv: STRING,
    // percent: NUMBER,
    // nota: NUMBER,
    // ects: NUMBER,
    // ucRealizada: STRING
    const subject = req.body;

    subject.createdBy = req.decodedUser.username;

    Processos.addSubjects(req.params.id, req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(err => res.jsonp(err));
});


module.exports = router;
