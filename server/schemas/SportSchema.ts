import { Schema, Model, model } from 'mongoose';
import { ISportDocument } from '../interfaces/ISportDocument';

let sport = new Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { en: { type: String, required: true }, es: { type: String, required: true } },
        description: { en: { type: String }, es: { type: String } }
    },
    { timestamps: true }
);

export const SportSchema: Model<ISportDocument> = model<ISportDocument>('Sport', sport);
