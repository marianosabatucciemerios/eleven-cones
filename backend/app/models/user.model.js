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
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
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
    roles: [{
        id: { type: Schema.Types.ObjectId, ref: 'Role' },
        code: String,
        name: String,
        shortName: String,
        default: Boolean
    }],
    managesTo: [{
        teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
    }],
    playsTo: [{
        teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
        shirtNumber: Number,
        position: {
            positionId: { type: Schema.Types.ObjectId, ref: 'Position' },
            code: String,
            name: String,
            shortName: String
        }
    }],
    isActive: Boolean
}, {
        timestamps: true
    });


userSchema.statics.findByEmail = function (email, cb) {
    return this.findOne({ 'email': email }, cb);
};




module.exports = mongoose.model('User', userSchema);