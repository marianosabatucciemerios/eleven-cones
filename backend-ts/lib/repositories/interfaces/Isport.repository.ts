export interface ISport<T> {
    getAll(): Promise<Array<T>>;
    getById(id: string): Promise<T>;
    createStport(sportParams: T): Promise<T>;
    delete(sportId: string): Promise<T>;
    update(sportId: String, sportParams: T): Promise<T>;
}