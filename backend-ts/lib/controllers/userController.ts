import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { UserServices } from 'services/userServices';

const User = mongoose.model('User', UserSchema);

export class UserController {

    constructor(
        private userService: UserServices
    ) {}

};
