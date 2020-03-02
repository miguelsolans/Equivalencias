/* Controller for Persons collection.
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

const Person = require('../models/person');

module.exports.list = (query) => {
    return Person.find(query).exec();
};

module.exports.addNew = (data) => {
    let newData = new Person(data);
    return newData.save();
};