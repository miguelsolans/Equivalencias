const express   = require('express');
const router    = express.Router();
const isAdmin   = require('../middleware/userAdmin');
const xmlParser = require('js2xmlparser');
const Processos = require('../controllers/processos');
const Pdf       = require('../utils/pdf');
const fs        = require('fs');

const checkAuth = require('../middleware/checkAuth');

/**
 * Export Data, admin protected
 * query {year}: registered data within given year
 * query {sort}: asc for ascending, desc for descending
 * query {limit}: maximum number of data
 * query {type}: JSON or XML output
 */
router.get('/export', checkAuth, isAdmin, async (req, res) => {

    let { year, sort, limit, type} = req.query;
    console.log(req.query);
    if(!type) {
        res.jsonp({title: "Type Not Specified", message: "Specify a data type (JSON or XML)"});
    } else {
        if(type.toLowerCase() === "xml") {
            // TODO: Export with XML
            let data = await Processos.list();

            console.log(data);

            res.status(200).xml(xmlParser.parse("data", data));

        }
        else if(type.toLowerCase() === "json") {

        }
        else {
            res.status(400).jsonp({title: "Unsupported type", message: `${type} is not a supported export data type`});
        }

    }
});

/**
 * Get Students Enrolled
 * query {year}: get enrolled students on a given year (optional)
 */
router.get('/', checkAuth, (req, res) => {
    let query = req.query;

    if(query.year) {
        console.log(`GET / ?year=${query.year}`);
        Processos.searchByYear(query.year)
            .then(data => res.jsonp(data))
            .catch(err => res.status(400).jsonp(err));
    } else {
        Processos.list(null, { processo: true, idAluno: true, nomeAluno: true })
            .then(data => res.jsonp(data))
            .catch(err => res.status(400).jsonp(err));
    }

});

/**
 * Get Process by Id
 * param {id}: process ID (Mongo ObjectID)
 */
router.get('/:id', checkAuth, (req, res) => {
    let idProcesso = req.params.id;

    Processos.findProcessById(idProcesso)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
});

/**
 * Generate PDF output
 * param {id}: process ID (Mongo ObjectID)
 */
router.post('/:id/generate', checkAuth, async (req, res) => {
    let idProcess = req.params.id;

    try {
        let process = await Processos.findProcessById( idProcess );

        const fileMetadata = {
            filename: Date.now(),
            generatedBy: req.decodedUser.fullName
        }

        await Processos.newDocument(process._id, fileMetadata);

        let studentPdf = new Pdf(process, req.decodedUser, fileMetadata.filename);

        let result = studentPdf.makePdf();


        if(!result) {
            res.status(500).jsonp({title: "Error!", message: "Some error occurred..."});
        } else {
            res.status(201).jsonp( {title: "Success!", message: "Successfully generated", file: {filename: fileMetadata.filename, generatedAt: new Date(fileMetadata.filename), generatedBy: fileMetadata.generatedBy }});

        }

    } catch(err) {
        res.status(500).jsonp( {title: "Error!", message: "Some error occurred while generating the PDF", error: err} )
    }

});

/**
 * Initiate a new Process
 * body {processo}: process number
 * body {idAluno}: student id
 * body {nomeAluno}: student full name
 * body {instProv}: university name
 * body {cursoProv}: course
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
            fs.mkdirSync(`app/files/${data._id}`, {
                recursive: true
            });
            console.log(data);
            res.status(201).jsonp(data);
        })
        .catch(err => res.status(400).jsonp(err));

});

/**
 * Update information
 * param {id}: process ID (Mongo ObjectID)
 * body {processo}: process id
 * body {idAluno}: student id
 * body {nomeAluno}: student fullname
 * body {instProv}: university name
 * body {cursoProv}: course
 */
router.put('/:id', checkAuth, (req, res) => {
    let id = req.params.id;
    const fields = {
        processo: req.body.processo,
        idAluno: req.body.idAluno,
        nomeAluno: req.body.nomeAluno,
        instProv: req.body.instProv,
        cursoProv: req.body.cursoProv
    }

    Processos.updateProcess(id, fields)
        .then(data => res.status(201).jsonp(data))
        .catch(err => res.status(400).jsonp(err))

});

/**
 * Delete process by its Id
 * param {id}: process ID (Mongo ObjectID)
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
        .catch(err => res.status(400).jsonp(err));

});

/**
 * Add Subjects to Process by its Id
 * param {id}: Process ID
 * body {semUcEquiv}: "1º Semestre" or "2º Semestre"
 * body {anoUcEquiv}: STRING
 * body {UcEquiv}: STRING
 * body {percent}: number
 * body {nota}: number between 0 and 20
 * body {ects}: number of ECTS
 * body {ucRealizada}: STRING
 */
router.post('/:id/subject', checkAuth, (req, res) => {
    const subject = {
        semUcEquiv: req.body.semUcEquiv,
        ucEquiv: req.body.ucEquiv,
        anoLetivo: req.body.anoLetivo,
        percent: req.body.percent,
        nota: req.body.nota,
        ects: req.body.ects,
        ucRealizada: req.body.ucRealizada,
        createdBy: req.decodedUser.username
    };

    Processos.addSubjects(req.params.id, subject)
        .then(data => res.status(201).jsonp(data))
        .catch(err => res.status(400).jsonp(err));
});

/**
 * Get Process files by its Id
 * param {id}: process ID (Mongo ObjectID)
 */
router.get('/:id/files', checkAuth, (req, res) => {
    Processos.listDocumentation(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
});

/**
 * Download a Process Document by its Id
 * param {id}: process ID
 * param {filename}: filename
 * returns multimedia content
 */
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