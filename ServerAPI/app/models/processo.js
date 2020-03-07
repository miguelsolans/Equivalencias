/* models/processo
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const mongoose = require('mongoose');

const equivalencias = new mongoose.Schema({
    ucRealizada: {
        type: String,
        required: [true, "Deve especificar o nome da UC realizada"]
    },
    ects: {
        type: Number,
        required: [true, "Deve especificar o numero de créditos"]
    },
    nota: {
        type: Number,
        required: [true, "Deve definir uma nota para a equivalencia do aluno"]
    },
    percent: {
        type: Number,
        required: true
    },
    ucEquiv: {
        type: String,
        required: [true, "Deve definir a UC que pretende dar como equivalencia"]
    },
    anoUcEquiv: {
        type: String,
        required: [true, "Deve especificar o ano da UC equivalente"]
    },
    semUcEquiv: {
        type: String,
        required: [true, "Deve especificar o semestre da UC equivalente"]
    }
});

const processoSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    processo: {
        type: String,
        required: true
    },
    idAluno: {
        type: String,
        required: [true, "Deve especificar "]
    },
    nomeAluno: {
        type: String,
        required: [true, "Deve especificar o nome do aluno!"]
    },
    instProv: {
        type: String,
        required: [true, "Deve especificar a Instituição de Ensino que o aluno é proveniente"]
    },
    cursoProv: {
        type: String,
        required: [true, "Deve especificar o curso do aluno"]
    },
    data: {
        type: Date,
        default: Date.now()
    },
    equivalencias: [equivalencias]
});

const Processo = mongoose.model('equivalencias', processoSchema, 'equivalencias');

module.exports = Processo;