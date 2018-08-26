import { Document } from 'mongoose';

export interface ISportDocument extends Document{
    code: String,
    name: String,
    description?: String
}
