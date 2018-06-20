var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SportSchema = new Schema({
    code: String,
    oder: Number,
    lang: {
        en: String,
        es: String
    },
    isActive: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Sport', SportSchema);