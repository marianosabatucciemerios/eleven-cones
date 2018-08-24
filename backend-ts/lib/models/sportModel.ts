import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SportSchema = new Schema({
    name: String,
    code: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});