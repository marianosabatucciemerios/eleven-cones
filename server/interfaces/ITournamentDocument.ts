import { Document } from 'mongoose';
import { ITournament } from './ITournament';

export interface ITournamentDocument extends ITournament, Document{
    //
}
