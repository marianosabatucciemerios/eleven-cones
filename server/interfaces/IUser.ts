import { IFoot } from './IFoot';
import { IUnitMeasure } from './IUnitMeasure';
import { IPassport } from './IPassport';

export interface IUser {
    firstName: String,
    lastName: String,
    picture?: String,
    birthdate?: Date,
    strongFoot?: IFoot,
    height?: IUnitMeasure,
    weight?: IUnitMeasure,
    email: String,
    phone?: {
        country: String,
        number: String
    }
    local?: {
        password: String,
        passwordReset?: {
            token: String,
            expired: Date
        }
    },
    facebook?: IPassport,
    twitter?: IPassport,
    google?: IPassport,
    // roles: IRole[],
    // manageesTo: ITeam[],
    // playsOn: [
    //     {
    //         teamId: ITeam,
    //         shirtNumber: Number,
    //         position: IPosition
    //     }
    // ],
    isActive?: Boolean
}
