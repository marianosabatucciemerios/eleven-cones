var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CurrencySchema = new Schema({
    code: String,
    name: String,
    shortName: String,
    description: String,
    isActive: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Currency', CurrencySchema);