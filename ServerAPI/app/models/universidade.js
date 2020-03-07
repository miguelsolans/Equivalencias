/* models/universidade
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    codCurso: {
        type: Number,
        required: [true, "Deve especificar o código de curso segundo a atribuição da Universidade"]
    },
    nomeCurso: {
        type: String,
        required: [true, "Deve especificar o nome do curso segundo a atribuição da Universidade"]
    }
});

const universidadeSchema = new mongoose.Schema({
    codInstit: {
        type: Number,
        required: [true, "Deve especificar o código da Universidade estipulado pela DGES"]
    },
    nomeInstit: {
        type: String,
        required: [true, "Deve especificar o nome da Instituição a adicionar"]
    },
    cursos: [cursoSchema]
});

const Universidade = mongoose.model('universidades', universidadeSchema, 'universidades');

module.exports = Universidade;