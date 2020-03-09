const express = require('express');
const router  = express.Router();

const Processos = require('../controllers/processos');

const pdf = require('../utils/pdf');

router.get('/generate', (req, res) => {
    let path = pdf.makePdf();

    console.log(path);

});
/**
 * Get Students Enrolled
 */
router.get('/', (req, res) => {
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

router.post('/:id/generate', (req, res) => {
    let idAluno = req.params.id;

    // pdf.makePdf();
    //
    // const fname = req.body.fname;
    // const lname = req.body.lname;
    //
    // const documentDefinition = {
    //     content: [
    //         `Hello ${fname} ${lname}` ,
    //         'Nice to meet you!'
    //     ]
    // };
    //
    // const pdfDoc = pdfMake.createPdf(documentDefinition);
    // pdfDoc.getBase64((data)=>{
    //     res.writeHead(200,
    //         {
    //             'Content-Type': 'application/pdf',
    //             'Content-Disposition':'attachment;filename="filename.pdf"'
    //         });
    //
    //     const download = Buffer.from(data.toString('utf-8'), 'base64');
    //     res.end(download);
    // });


    Processos.findOneStudent( idAluno )
        .then(data => {
            console.log("DATA FETCHED...Passing to utils now");
            // console.log(data.equivalencias);
            let result = pdf.makePdf(data);

            console.log(result ? "Successfully generated" : "Some error occurred...");

        })
        .catch(err => console.log(err));
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