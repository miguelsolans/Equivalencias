
module.exports = (req, res, next) => {
    console.log("Checking Role");

    req.decodedUser.admin ? next() : res.status(403).jsonp({title: "Forbidden", message: "Insufficient permissions to perform this action"});

};