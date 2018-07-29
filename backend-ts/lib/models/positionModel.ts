import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PositionSchema = new Schema({
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