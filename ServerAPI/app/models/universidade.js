/* models/universidade
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    codCurso: {
        type: Number,
        required: true
    },
    nomeCurso: {
        type: String,
        required: true
    }
});

const universidadeSchema = new mongoose.Schema({
    codInstit: {
        type: Number,
        required: true
    },
    nomeInstit: {
        type: String,
        required: true
    },
    cursos: [cursoSchema]
});

const Universidade = mongoose.model('universidades', universidadeSchema, 'universidades');

module.exports = Universidade;