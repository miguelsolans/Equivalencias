const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    CodCurso: {
        type: Number,
        required: true
    },
    NomeCurso: {
        type: String,
        required: true
    }
});


const universidadeSchema = new mongoose.Schema({
    CodInstit: {
        type: Number,
        required: true
    },
    NomeInstit: {
        type: String,
        required: true
    },
    Cursos: [cursoSchema]
});

const Universidade = mongoose.model('universidades', universidadeSchema, 'universidades');

module.exports = Universidade;