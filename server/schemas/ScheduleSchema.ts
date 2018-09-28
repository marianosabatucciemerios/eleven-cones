import { Schema, Model, model } from 'mongoose';
import { IScheduleDocument } from '../interfaces/IScheduleDocument';

let schedule = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String },
        appointment: { type: Date },
        opponent: { type: Schema.Types.ObjectId, ref: 'Team' },
        tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
        stadium: { type: Schema.Types.ObjectId, ref: 'Stadium' }
    },
    { timestamps: true }
);

export const ScheduleSchema: Model<IScheduleDocument> = model<IScheduleDocument>('Schedule', schedule);
