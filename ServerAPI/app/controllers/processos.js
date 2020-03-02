/* Controller for Processos collection
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const Processo = require('../models/processo');

module.exports.list = (query, projection) => {
    return Processo.find(query, projection);
};