var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ManagerSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    isActive: Boolean
}, {
        timestamps: true
    });

module.exports = mongoose.model('Manager', UserSchema);