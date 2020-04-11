/* Controller for Processos collection
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const Processo = require('../models/processo');

module.exports.list = (query, projection) => {
    return Processo.find(query, projection);
};

module.exports.findOneStudent = (id) => {
    return Processo.findOne({idAluno: id});
};

module.exports.findProcessById = (id) => {
    return Processo.findOne( {processo: id} );
};

module.exports.new = ({processo, idAluno, nomeAluno, instProv, cursoProv, initiatedBy}) => {
    let _id = processo;
    const newProcess = new Processo({ _id, processo, idAluno, nomeAluno, instProv, cursoProv, initiatedBy });

    return newProcess.save();
};

module.exports.delete = (id) => {
    return Processo.findByIdAndDelete(id);
};

module.exports.searchByYear = (year) => {
    let start = new Date(year, 0, 1),
        end = new Date(year + 1, 0, 1);

    return Processo.find({ data: { $gte: start, $lt: end} });
};

// // semUcEquiv: STRING,
//     // anoUcEquiv: STRING,
//     // ucEquiv: STRING,
//     // percent: NUMBER,
//     // nota: NUMBER,
//     // ects: NUMBER,
//     // ucRealizada: STRING
module.exports.addSubjects = (id, { semUcEquiv, anoUcEquiv, ucEquiv, percent, nota, ects, ucRealizada, createdBy}) => {
    const subject = {
        semUcEquiv: semUcEquiv,
        anoUcEquiv: anoUcEquiv,
        ucEquiv: ucEquiv,
        percent: percent,
        nota: nota,
        ects: ects,
        ucRealizada: ucRealizada,
        createdBy: createdBy
    };
    // equivalencias
    return Processo.findOneAndUpdate({ _id: id}, { $push: { equivalencias: subject } })
};