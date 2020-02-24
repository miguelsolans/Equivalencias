const Processo = require('../models/processo');


module.exports.list = (query, projection) => {

    return Processo.find(query, projection);
};