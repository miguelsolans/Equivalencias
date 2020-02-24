const Universidade = require('../models/universidade');


module.exports.list = (query, projection) => {

    return Universidade.find(query, projection);
};