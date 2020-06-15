/* Controller of Universidades collection
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const Universidade = require('../models/universidade');

module.exports.list = (query, projection) => {

    return Universidade.find(query, projection);
};

module.exports.addNew = ({codInstit, nomeInstit}) => {
    const university = new Universidade({
        codInstit: codInstit,
        nomeInstit: nomeInstit
    });

    return university.save();
};

module.exports.getUniversityCourses = (id) => {

    return Universidade.findById(id, { Cursos: 1 });
};

module.exports.addCourse = (codInstit, { codCurso, nomeCurso}) => {

	
};