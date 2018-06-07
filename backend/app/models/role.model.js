var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    code: String,
    name: String,
    shortName: String,
    isActive: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema);