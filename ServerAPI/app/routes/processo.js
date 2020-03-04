const express = require('express');
const router = express.Router();

const Processos = require('../controllers/processos');

/**
 * Get Students Enrolled
 */
router.get('/', (req, res) => {

    Processos.list()
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));

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