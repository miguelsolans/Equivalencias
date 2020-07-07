/* models/processo
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const mongoose = require('mongoose');

const document = new mongoose.Schema({
   filename: {
       type: String,
       required: true
   },

    generatedBy: {
        type: String,
        required: true
    },
    generatedAt: {
        type: Date,
        default: Date.now(),
    }
});

const equivalencias = new mongoose.Schema({
    ucRealizada: {
        type: String,
        required: [true, "Deve especificar o nome da UC realizada"]
    },
    ects: {
        type: Number,
        integer: true,
        required: [true, "Deve especificar o numero inteiro de créditos"]
    },
    nota: {
        type: Number,
        min: 0,
        max: 20,
        required: [true, "Deve definir uma nota (0 a 20) para a equivalencia do aluno"],
        //validate:
        // validators: {
        //     message: props => `${props.value} deve especificar uma nova error...`
        // }
    },
    anoLetivo: {
        type: String,
        required: [true, "Deve especificar o ano letivo referente à equivalência, sob formato (AAAA/AAAA)"],
    },
    percent: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    ucEquiv: {
        type: String,
        required: [true, "Deve definir a UC que pretende dar como equivalencia"]
    },
    semUcEquiv: {
        type: String,
        required: [true, "Deve especificar o semestre da UC equivalente"]
    },
    // Meta Data Information for control purposes
    // Save username 
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },

});

const processoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    processo: {
        type: String,
        required: true,
        unique: true
    },
    initiatedBy: {
        type: String,
        required: true
    },
    idAluno: {
        type: String,
        required: [true, "Deve especificar o identificador do aluno"]
    },
    nomeAluno: {
        type: String,
        required: [true, "Deve especificar o nome do aluno"]
    },
    instProv: {
        type: String,
        required: [true, "Deve especificar a Instituição de Ensino que o aluno é proveniente"]
    },
    cursoProv: {
        type: String,
        required: [true, "Deve especificar o curso do aluno"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    equivalencias: [equivalencias],
    documentation: [document]
});

const Processo = mongoose.model('equivalencias', processoSchema, 'equivalencias');

module.exports = Processo;