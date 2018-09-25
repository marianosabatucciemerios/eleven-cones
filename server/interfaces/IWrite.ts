export interface IWrite<T> {
    create(item: T): Promise<T>;
    update(id: String, item: T): Promise<T>;
    delete(id: String): Promise<T>;
}
