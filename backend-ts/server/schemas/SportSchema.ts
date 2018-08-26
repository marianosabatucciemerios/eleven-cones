import { Schema, Model, model } from 'mongoose';
import { ISportDocument } from '../interfaces/ISportDocument';

let sport = new Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String }
    },
    { timestamps: true }
);

export const SportSchema: Model<ISportDocument> = model<ISportDocument>('Sport', sport);
