import { Document } from 'mongoose';
import { IStadium } from './IStadium';

export interface IStadiumDocument extends IStadium, Document{
    //
}
