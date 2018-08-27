import { Document, Model, Types } from "mongoose";
import { IRead } from "../interfaces/IRead";
import { IWrite } from "../interfaces/IWrite";

export class BaseRepository<T extends Document> implements IRead<T>, IWrite<T> {

    private _model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this._model = schemaModel;
    }

    // IWrite
    public async create(item: T): Promise<T> {
        return this._model.create(item);
    }

    public async update(_id: Types.ObjectId, item: T): Promise<T> {
        return this._model.update({ _id: _id }, item);
    }

    public async delete(_id: Types.ObjectId): Promise<T> {
        return this._model.remove({ _id: _id });
    }

    // IRead
    public async find(cond?: Object, fields?: Object, options?: Object): Promise<T[]> {
        return this._model.find(cond, fields, options);
    }

    public async findAll(): Promise<T[]> {
        return this._model.find();
    }

    public async findById(_id: Types.ObjectId): Promise<T> {
        return this._model.findById(_id);
    }

    public async findOne(cond?: Object): Promise<T> {
        return this._model.findOne(cond);
    }
}