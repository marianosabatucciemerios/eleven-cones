import { Schema, Model, model } from 'mongoose';
import { IStadiumDocument } from '../interfaces/IStadiumDocument';

let stadium = new Schema(
    {
        code: { type: String, unique: true, lowercase: true, required: true },
        name: { type: String, required: true },
        description: { type: String },
        address: {
            Line1: { type: String },
            Line2: { type: String },
            city: { type: String },
            zipcode: { type: String },
            state: { type: String }
        },
        location: {
            type: { type: String },
            coordinates: []
        }
    },
    { timestamps: true }
);

// stadium.index({ location: "2dsphere" });

export const StadiumSchema: Model<IStadiumDocument> = model<IStadiumDocument>('Stadium', stadium);
