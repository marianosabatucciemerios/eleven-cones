import { Types } from "mongoose";

export interface IWrite<T> {
    create(item: T): Promise<T>;
    update(_id: Types.ObjectId, item: T): Promise<T>;
    delete(_id: Types.ObjectId): Promise<T>;
}
