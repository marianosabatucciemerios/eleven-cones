import { Document } from 'mongoose';
import { ITeam } from './ITeam';

export interface ITeamDocument extends ITeam, Document{
    //
}
