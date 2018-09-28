import { Document } from 'mongoose';
import { ISchedule } from './ISchedule';

export interface IScheduleDocument extends ISchedule, Document{
    //
}
