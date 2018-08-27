import { Types } from "mongoose";

export interface IRead<T> {
    find(cond?: Object, fields?: Object, options?: Object): Promise<T[]>;
    findAll(): Promise<T[]>;
    findById(_id: Types.ObjectId): Promise<T>;
    findOne(cond?: Object): Promise<T>;
}
