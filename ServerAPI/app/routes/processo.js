// TODO: CRIAR UMA QUERY QUE MOSTRA UC DE EQUIVALENCIAS SEMELHANTES


const express = require('express');
const router  = express.Router();

const Processos = require('../controllers/processos');

const pdf = require('../utils/pdf');
const fs = require('fs');

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

// TODO: REFACTOR THIS NASTY CODE TO ASYNC/AWAIT
router.post('/:id/generate', checkAuth, (req, res) => {
    let idProcess = req.params.id;

    Processos.findProcessById( idProcess )
        .then(process => {
            console.log("Process Found");
            const fileMetadata = {
                filename: Date.now(),
                generatedBy: req.decodedUser.fullName
            };
            Processos.newDocument(process.processo, fileMetadata)
                .then(document => {
                    console.log("DATA FETCHED...Passing to utils now");

                    console.log(document);

                    let result = pdf.makePdf(process, req.decodedUser, fileMetadata.filename);
                    let msgOutput = result ? "Successfully generated" : "Some error occurred...";

                    res.status(201).jsonp( {title: "Success!", message: msgOutput} );

                })
                .catch(err => res.jsonp( {title: "Error!", message: "Some error occurred while generating a PDF output", error: err} ));

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
        .then(data => {
            // fs.mkdirSync(`app/files/${data.processo}`);
            fs.mkdirSync(`app/files/${data.processo}`, {
                recursive: true
            });
            console.log(data);
            res.status(201).jsonp(data);
        })
        .catch(err => res.jsonp(err));

});

/**
 * Delete a student given by his ID
 */
router.delete('/:id', checkAuth, (req, res) => {
    console.log(req.params.id);

    Processos.delete(req.params.id)
        .then(data => {
            fs.rmdirSync(`app/files/${data.processo}`, {
                recursive: true
            });

            res.jsonp(data);
        })
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

router.get('/:id/files', (req, res) => {
    Processos.listDocumentation(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.json(err));
});


router.get('/:id/file/:filename', checkAuth, (req, res) => {

    fs.readFile(`./app/files/${req.params.id}/${req.params.filename}.pdf`, ( error, data ) => {
        if(error) {
            res.status(404).json({title: "Not Found", message: "File not found!"});
        } else {
            res.contentType("application/pdf");
            res.status(200).send(data);
        }
    });

});

module.exports = router;
