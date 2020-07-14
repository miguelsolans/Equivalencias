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
    return Processo.findOne( {_id: id} );
};

module.exports.new = ({processo, idAluno, nomeAluno, instProv, cursoProv, initiatedBy}) => {

    const newProcess = new Processo({ processo, idAluno, nomeAluno, instProv, cursoProv, initiatedBy });

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
    return Processo.findOneAndUpdate({ _id: id},
        { $push: { equivalencias: subject } },
        { new: true, runValidators: true })

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
    const mongoose = require('mongoose');
    return Processo.aggregate([
        {
            '$match': {
                //'processo': new mongoose.mongo.ObjectId(processId)
                'processo': processId
            }
        }, {
            '$project': {
                '_id': true,
                'processo': true,
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

// Queries have not been fully tested
module.exports.courseSubjects = (university, course) => {
    return Processo.aggregate([
        {
            '$match': {
                'instProv': university,
                'cursoProv': course
            }
        }, {
            '$project': {
                'equivalencias': true
            }
        }, {
            '$unwind': {
                'path': '$equivalencias'
            }
        }, {
            '$replaceRoot': {
                'newRoot': '$equivalencias'
            }
        }, {
            '$group': {
                '_id': '$ucRealizada',
                'uniqueCount': {
                    '$sum': 1
                },
                'ucRealizada': {
                  '$first': '$ucRealizada'
                },
                'percent': {
                    '$first': '$percent'
                },
                'ects': {
                    '$first': '$ects'
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

/**
 * Returns similar equivalences for a given university, course and subject
 * @param university: source university
 * @param course: source course
 * @param subject: subject already done
 * @returns {Aggregate}
 */
module.exports.equivalenceSubject = (university, course, subject) => {
    return Processo.aggregate([
        {
            '$match': {
                'instProv': university,
                'cursoProv': course
            }
        }, {
            '$project': {
                'equivalencias': true
            }
        }, {
            '$unwind': {
                'path': '$equivalencias'
            }
        }, {
            '$replaceRoot': {
                'newRoot': '$equivalencias'
            }
        }, {
            '$match': {
                'ucRealizada': subject
            }
        }, {
            '$group': {
                '_id': '$ucEquiv',
                'uniqueCount': {
                    '$sum': 1
                },
                'percent': {
                    '$first': '$percent'
                },
                'ects': {
                    '$first': '$ects'
                },
                'ucEquiv': {
                    '$first': '$ucEquiv'
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