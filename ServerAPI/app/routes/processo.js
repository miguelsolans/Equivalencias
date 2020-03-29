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

router.get('/auth', checkAuth, (req, res) => {
    res.render("<h3>Hello World</h3>");
});

router.post('/:id/generate', checkAuth, (req, res) => {
    let idAluno = req.params.id;

    console.log(req.decodedUser);

    Processos.findOneStudent( idAluno )
        .then(data => {
            console.log("DATA FETCHED...Passing to utils now");
            // console.log(data.equivalencias);
            let result = pdf.makePdf(data);

            let msgOutput = result ? "Successfully generated" : "Some error occurred...";

            res.jsonp( {title: "Success!", message: msgOutput} );
        })
        .catch(err => res.jsonp( {title: "Error!", message: "Some error occurred while generating a PDF output", error: err} ));
});

/**
 * Create a new Student
 */
router.post('/', (req, res) => {
    const info = req.body;

    console.log(info);

    Processos.new(req.body)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));

});

/**
 * Delete a student given by his ID
 */
router.delete('/:id', (req, res) => {
    console.log(req.params.id);

    Processos.delete(req.params.id)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));

});

/**
 * Add Subjects to Student
 */
router.put('/', (req, res) => {
    console.log("UPDATE Student");
});


module.exports = router;