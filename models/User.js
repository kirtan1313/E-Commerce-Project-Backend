const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    }
});

const user = mongoose.model('Users', UserModel);
module.exports = user;
