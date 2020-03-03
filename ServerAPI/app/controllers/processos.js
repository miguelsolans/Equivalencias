const Processo = require('../models/processo');


module.exports.list = (query, projection) => {

    return Processo.find(query, projection);
};

module.exports.new = ({_id, processo, idAluno, nomeAluno, instProv, cursoProv}) => {

    const newProcess = new Processo({_id, processo, idAluno, nomeAluno, instProv, cursoProv});

    return newProcess.save();
};

module.exports.delete = (id) => {
    return Processo.findByIdAndDelete(id);
};