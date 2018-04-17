const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    info: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        height: Number,
        weight: Number,
        birthday: Date,
        foot: String,
        picture: String,
        position: String,
        number: Number
    },
    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('User', UserSchema);