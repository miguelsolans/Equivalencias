/* Middlware for user authentication and route protection
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */

module.exports = (req, res, next) => {
    console.log("Checking Role");

    req.decodedUser.admin ? next() : res.status(403).jsonp({title: "Forbidden", message: "Insufficient permissions to perform this action"});

};