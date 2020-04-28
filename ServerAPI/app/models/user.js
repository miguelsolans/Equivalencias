const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    deletable: {
        type: Boolean,
        required: true,
        default: true
    },
    fullName: {
        type: String,
        required: true
    }
});

const User = mongoose.model('users', userScheme, 'users');

module.exports = User;