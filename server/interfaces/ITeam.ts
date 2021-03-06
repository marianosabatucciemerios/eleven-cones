import { ObjectId } from "bson";

export interface ITeam {
    code: String,
    name: String,
    description?: String,
    manager: ObjectId,
    builtDate: Date,
    homeColor?: String,
    awayColor?: String,
    defaultLineupQty?: Number,
    shield?: String,
    cover?: String,
    isActive: Boolean
    inactiveDate: Date,
    squad: ObjectId[]
}
