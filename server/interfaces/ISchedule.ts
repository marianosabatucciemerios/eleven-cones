import { ObjectId } from "bson";

export interface ISchedule {
    user: ObjectId,
    type: String,
    appointment: Date,
    opponent?: ObjectId,
    tournament?: ObjectId,
    stadium?: ObjectId
}
