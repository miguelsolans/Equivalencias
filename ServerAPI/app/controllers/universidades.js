/* Controller of Universidades collection
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const Universidade = require('../models/universidade');

module.exports.list = (query, projection) => {

    return Universidade.find(query, projection);
};