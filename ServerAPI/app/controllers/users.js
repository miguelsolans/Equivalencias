const User = require('../models/user');

module.exports.newUser = ({username, password, email}) => {
    const newUser = new User({
        username: username,
        password: password,
        email: email
    });

    return newUser.save();
};

module.exports.searchUser = (username) => {
    return User.findOne({ username: username });
};

module.exports.changePassword = (username, newPassword) => {
    return User.findOneAndUpdate( {username: username} , { password: newPassword })
};

module.exports.destroyUser = (username) => {
    return User.findOneAndRemove( {username: username} );
};