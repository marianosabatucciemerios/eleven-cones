export interface IRead<T> {
    find(cond?: Object, fields?: Object, options?: Object): Promise<T[]>;
    findAll(): Promise<T[]>;
    findById(id: String): Promise<T>;
    findOne(cond?: Object): Promise<T>;
}
