import * as mongoose from 'mongoose';
import { UserSchema } from 'models/userModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController {
    
};