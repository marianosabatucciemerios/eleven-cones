var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    picture: {
        data: Buffer,
        contentType: String
    },
    birthday: Date,
    age: Number,
    email: { type: String, unique: true, lowercase: true },
    local: {
        password: String,
        passwordReset: {
            token: String,
            expired: Date
        }
    },
    facebook: {
        id: String,
        token: String,
        name: String,
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
        name: String
    },
    defaultRole: String,
    roles: [],
    isActive: Boolean
}, {
        timestamps: true
    });


userSchema.statics.findByEmail = function (email, cb) {
    return this.findOne({ 'email': email }, cb);
};




module.exports = mongoose.model('User', userSchema);