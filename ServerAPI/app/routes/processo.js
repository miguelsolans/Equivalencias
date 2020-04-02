const express = require('express');
const router  = express.Router();

const Processos = require('../controllers/processos');

const pdf = require('../utils/pdf');

const checkAuth = require('../middlware/checkAuth');


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
        Processos.list()
            .then(data => res.jsonp(data))
            .catch(err => res.jsonp(err));
    }

});

router.get('/:id/processes', checkAuth, (req, res) => {
    // Listar os processos de um aluno
    let idAluno = req.params.id;
});

router.post('/:id/generate', checkAuth, (req, res) => {
    let idAluno = req.params.id;

    Processos.findProcessById( idAluno )
        .then(data => {
            console.log("DATA FETCHED...Passing to utils now");

            let result = pdf.makePdf(data, req.decodedUser);

            let msgOutput = result ? "Successfully generated" : "Some error occurred...";

            res.jsonp( {title: "Success!", message: msgOutput} );
        })
        .catch(err => res.jsonp( {title: "Error!", message: "Some error occurred while generating a PDF output", error: err} ));
});

/**
 * Create a new Student
 */
router.post('/', checkAuth, (req, res) => {
    const info = req.body;

    info.initiatedBy = req.decodedUser.username;

    Processos.new(info)
        .then(data => res.jsonp(data))
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
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});


module.exports = router;