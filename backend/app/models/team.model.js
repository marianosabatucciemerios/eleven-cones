var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    sport: {
        code: String,
        name: String
    },
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
    //lineups: [{type: Schema.Types.ObjectId, ref: 'Lineup'}],
    squad: [{type: Schema.Types.ObjectId, ref: 'Player'}],
    managerId: {type: Schema.Types.ObjectId, ref: 'Manager'} 
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);