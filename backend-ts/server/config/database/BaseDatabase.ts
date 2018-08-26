import * as mongoose from "mongoose"

export class BaseDatabase {

    private _mongoUrl: string;

    constructor() {
        this._mongoUrl = 'mongodb://localhost:27017/eleven-cones';
        this.connect();
    }

    private connect(): void {
        mongoose.connect(this._mongoUrl, { useNewUrlParser: true });
    }

}