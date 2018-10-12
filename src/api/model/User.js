const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: 'String',
        unique: true,
        required: true,
        dropDups: true
    },
    password: {
        type: 'String',
        required: true
    },
    firstName: {
        type: 'String',
        required: true
    },
    lastName: {
        type: 'String',
        required: true
    },
    userType: {
        type: 'String',
        required: true
    },
    accessToken : {
        type: 'String',
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);