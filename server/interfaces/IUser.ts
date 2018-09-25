import { IFoot } from './IFoot';
import { IUnitMeasure } from './IUnitMeasure';
import { IPassport } from './IPassport';

export interface IUser {
    firstName?: String,
    lastName?: String,
    email: String,
    picture?: String,
    birthdate?: Date,
    strongFoot?: IFoot,
    backNumber?: Number,
    height?: IUnitMeasure,
    weight?: IUnitMeasure,
    local: {
        password?: String,
        passwordReset?: {
            token: String,
            expired: Date
        }
    },
    //facebook: IPassport,
    //twitter: IPassport,
    //google: IPassport,
    // roles: IRole[],
    // manageesTo: ITeam[],
    // playsOn: [
    //     {
    //         teamId: ITeam,
    //         shirtNumber: Number,
    //         position: IPosition
    //     }
    // ],
    isActive: Boolean,
    inactiveDate?: Date
}
