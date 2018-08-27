import { Document } from 'mongoose';
import { ISport } from './ISport';

export interface ISportDocument extends ISport, Document{
    //
}
