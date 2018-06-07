var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventTypeSchema = new Schema({
    code: String,
    name: String,
    shortName: String,
    description: String,
    specialAttribute: String,
    isActive: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('EventType', EventTypeSchema);