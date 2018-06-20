var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PositionSchema = new Schema({
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

PositionSchema.statics.findByCode = function (code) {
    return this.findOne({ 'code': code });
};

module.exports = mongoose.model('Position', PositionSchema);