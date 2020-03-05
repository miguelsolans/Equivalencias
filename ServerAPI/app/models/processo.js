/* models/processo
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const mongoose = require('mongoose');

const equivalencias = new mongoose.Schema({
    ucRealizada: {type: String, required: true},
    ects: {type: Number, required: true},
    nota: {type: Number, required: true},
    percent: {type: Number, required: true},
    ucEquiv: {type: String, required: true},
    anoUcEquiv: {type: String, required: true},
    semUcEquiv: {type: String, required: true}
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
        required: true
    },
    nomeAluno: {
        type: String,
        required: true
    },
    instProv: {
        type: String,
        required: true
    },
    cursoProv: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    },
    equivalencias: [equivalencias]
});

const Processo = mongoose.model('equivalencias', processoSchema, 'equivalencias');

module.exports = Processo;