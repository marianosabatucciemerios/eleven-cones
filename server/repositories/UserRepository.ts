import { BaseRepository } from "./BaseRepository";
import { IUserDocument } from "../interfaces/IUserDocument";
import { UserSchema } from "../schemas/UserSchema"

export class UserRepository extends BaseRepository<IUserDocument> {
    constructor() {
        super(UserSchema);
    };

    public async findByEmail(email: String): Promise<IUserDocument> {
        return UserSchema.findOne({ 'email': email, 'isActive': true });
    }
}
