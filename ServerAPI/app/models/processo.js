const mongoose = require('mongoose');

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
    }
});

const Processo = mongoose.model('processos', processoSchema, 'processos');

module.exports = Processo;