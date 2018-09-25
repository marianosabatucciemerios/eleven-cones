import { Document, Model } from "mongoose";
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

    public async update(id: String, item: T): Promise<T> {
        return this._model.update({ _id: id }, item);
    }

    public async delete(id: String): Promise<T> {
        return this._model.findByIdAndUpdate(id, { isActive: false, inactiveDate: new Date() });
    }

    // IRead
    public async find(cond?: Object, fields?: Object, options?: Object): Promise<T[]> {
        return this._model.find(cond, fields, options);
    }

    public async findAll(): Promise<T[]> {
        return this._model.find();
    }

    public async findById(id: String): Promise<T> {
        return this._model.findById(id);
    }

    public async findByCode(code: String): Promise<T> {
        return this._model.findOne({ 'code': code });
    }

    public async findOne(cond?: Object): Promise<T> {
        return this._model.findOne(cond);
    }
}