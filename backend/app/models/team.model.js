var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    code: String,
    name: String,
    description: String,
    yearBuilt: Date,
    emblem: {
        data: Buffer,
        contentType: String
    },
    shirt: {
        data: Buffer,
        contentType: String
    },
    cover: {
        data: Buffer,
        contentType: String
    },
    sport: {
        code: String,
        name: String
    },
    //lineups: [{type: Schema.Types.ObjectId, ref: 'Lineup'}],
    squad: [{type: Schema.Types.ObjectId, ref: 'User'}],
    manager: {
        managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
        firstName: String,
        lastName: String
    } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);