var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SportSchema = new Schema({
    code: String,
    name: String,
    shortName: String,
    description: String,
    isActive: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Sport', SportSchema);