import { Schema, Model, model } from 'mongoose';
import { ITournamentDocument } from '../interfaces/ITournamentDocument';

let tournament = new Schema(
    {
        code: { type: String, unique: true, lowercase: true, required: true },
        name: { type: String, required: true },
        description: { type: String },

    },
    { timestamps: true }
);

export const TournamentSchema: Model<ITournamentDocument> = model<ITournamentDocument>('Tournament', tournament);
