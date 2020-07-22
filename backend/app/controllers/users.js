/*
 * Controller of Universidades collection
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */
const User = require('../models/user');

module.exports.findById = (id) => {
    return User.findById(id);
};

module.exports.updateInformation = (username, fullName, email, admin) => {

    return User.findOneAndUpdate({username: username}, {fullName: fullName, email: email, admin: admin}, {
        runValidators: true
    });
};

module.exports.getUsers = () => {
    return User.find(null, { password: 0})
}
module.exports.newUser = ({username, password, email, fullName, admin}) => {
    const newUser = new User({
        username: username,
        password: password,
        email: email,
        fullName: fullName,
        admin: admin
    });

    return newUser.save();
};

module.exports.searchUser = (username) => {
    return User.findOne({ username: username }, {password: 0});
};

module.exports.searchWithPassword = (username) => {
    return User.findOne({ username: username});
}

module.exports.changePassword = (username, newPassword) => {
    return User.findOneAndUpdate( {username: username} , { password: newPassword })
};

module.exports.destroyUser = (username) => {
    return User.findOneAndRemove( {username: username} );
};

module.exports.updateUsername = (username, newUsername) => {
    return User.findOneAndUpdate({ username: username}, { username: newUsername }, { "fields": { "password": false }});
}