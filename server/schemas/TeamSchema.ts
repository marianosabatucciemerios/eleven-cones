import { Schema, Model, model } from 'mongoose';
import { ITeamDocument } from '../interfaces/ITeamDocument';

let team = new Schema(
    {
        code: { type: String, unique: true, lowercase: true, required: true },
        name: { type: String, required: true },
        description: { type: String, },
        manager: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        builtDate: { type: Date },
        homeColor: { type: String },
        awayColor: { type: String },
        defaultLineupQty: { type: Number },
        shield: { data: Buffer, contentType: String },
        cover: { data: Buffer, contentType: String },
        isActive: { type: Boolean, default: true },
        inactiveDate: { type: Date },
        squad: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    { timestamps: true }
);

export const TeamSchema: Model<ITeamDocument> = model<ITeamDocument>('Team', team);
