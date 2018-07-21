var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    picture: { data: Buffer, contentType: String },
    birthdate: Date,
    strongFoot: {
        code: String,
        lang: {
            en: String,
            es: String
        }
    },
    height: {
        unit: {
            code: String,
            lang: {
                en: String,
                es: String
            },
        },
        value: Number
    },
    weight: {
        unit: {
            code: String,
            lang: {
                en: String,
                es: String
            },
        },
        value: Number
    },
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
    roles: [{
        id: { type: Schema.Types.ObjectId, ref: 'Role' },
        code: String,
        lang: {
            en: String,
            es: String
        },
        default: Boolean
    }],
    managesTo: [{
        teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
    }],
    playsTo: [{
        team: {
            id: { type: Schema.Types.ObjectId, ref: 'Team' },
        },
        shirtNumber: Number,
        position: {
            id: { type: Schema.Types.ObjectId, ref: 'Position' },
            code: String,
            lang: {
                en: String,
                es: String
            }
        }
    }],
    isActive: Boolean
}, {
        timestamps: true
    });

UserSchema.statics.findByEmail = function (email, cb) {
    return this.findOne({ 'email': email }, cb);
};

UserSchema.statics.findById = function (id, cb) {
    return this.findOne({ '_id': id }, cb);
};

module.exports = mongoose.model('User', UserSchema);