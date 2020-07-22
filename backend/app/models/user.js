/* models/user
 * Author: Diogo Araújo
 * Author: Diogo Nogueira
 * Author: Miguel Solans
 */
const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/, 'Introduza um e-mail válido!']
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    fullName: {
        type: String,
        required: true,
        minlength: 3
    }
});

const User = mongoose.model('users', userScheme, 'users');

module.exports = User;