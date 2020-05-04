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
    return Processo.findById( id );
};

module.exports.new = ({processo, idAluno, nomeAluno, instProv, cursoProv, initiatedBy}) => {
    let _id = processo;

    const newProcess = new Processo({ _id, processo, idAluno, nomeAluno, instProv, cursoProv, initiatedBy });

    return newProcess.save();

    // await new Promise(async (resolve, reject) => {
    //
    //     try {
    //         let _id = processo;
    //
    //         const newProcess = new Processo({ _id, processo, idAluno, nomeAluno, instProv, cursoProv, initiatedBy });
    //
    //         const data = await newProcess.save();
    //         console.log("INSIDE PROMISE");
    //         console.log(data);
    //
    //         return resolve(data);
    //
    //     } catch(err) {
    //         return reject(err);
    //     }
    // })

    // return newProcess.save();
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
module.exports.addSubjects = (id, { semUcEquiv, ucEquiv, anoLetivo, percent, nota, ects, ucRealizada, createdBy}) => {
    const subject = {
        semUcEquiv: semUcEquiv,
        ucEquiv: ucEquiv,
        anoLetivo: anoLetivo,
        percent: percent,
        nota: nota,
        ects: ects,
        ucRealizada: ucRealizada,
        createdBy: createdBy
    };
    return Processo.findOneAndUpdate({ _id: id}, { $set: { equivalencias: subject } }, { new: true, runValidators: true })

};

module.exports.newDocument = (id, { filename, requestedBy }) => {
    const newDocument = {
        filename: filename,
        requestedBy: requestedBy
    };
    // New document
    return Processo.findOneAndUpdate({ _id: id}, { $push: { documentation: newDocument } });
};

module.exports.listDocumentation = (processId) => {
    //return Processo.findOne({ processo: processId}, { documentation: true })
    return Processo.aggregate([
        {
            '$match': {
                '_id': processId
            }
        }, {
            '$project': {
                '_id': true,
                'documentation': true
            }
        }, {
            '$unwind': {
                'path': '$documentation'
            }
        }, {
            '$sort': {
                'documentation.filename': -1
            }
        }, {
            '$addFields': {
                'filename': '$documentation.filename',
                'generatedBy': '$documentation.generatedBy',
                'generatedAt': '$documentation.generatedAt'
            }
        }, {
            '$project': {
                'documentation': false
            }
        }
    ])
};

module.exports.universityCourses = (universityName) => {
    return Processo.aggregate([
        {
            '$match': {
                'instProv': universityName
            }
        }, {
            '$group': {
                '_id': '$cursoProv',
                'uniqueCount': {
                    '$sum': 1
                },
                'instProv': {
                    '$first': '$instProv'
                },
                'cursoProv': {
                    '$first': '$cursoProv'
                }
            }
        }, {
            '$project': {
                '_id': false,
                'uniqueCount': false
            }
        }
    ])
};