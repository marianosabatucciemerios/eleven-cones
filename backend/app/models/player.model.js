var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    number: Number,
    position: {
        code: String,
        name: String
    },
    foot: {
        code: String,
        name: String
    },
    height: Number,
    weight: Number,
    isActive: Boolean
}, {
        timestamps: true
    });

module.exports = mongoose.model('Player', UserSchema);