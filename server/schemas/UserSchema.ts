import { Schema, Model, model } from 'mongoose';
import { IUserDocument } from '../interfaces/IUserDocument';

let user = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, unique: true, lowercase: true },
        picture: { data: Buffer, contentType: String },
        birthDate: { type: Date },
        strongFoot: {
            code: { type: String },
            name: { en: { type: String }, es: { type: String } }
        },
        backNumber: { type: Number },
        height: {
            code: { type: String },
            name: { en: { type: String }, es: { type: String } },
            value: { type: Number }
        },
        weight: {
            code: { type: String },
            name: { en: { type: String }, es: { type: String } },
            value: { type: Number }
        },
        local: {
            password: { type: String },
            passwordReset: { token: { type: String }, expired: { type: Date } }
        },
        // facebook: {
        //     id: { type: String },
        //     token: { type: String },
        //     name: { type: String }
        // },
        // twitter: {
        //     id: { type: String },
        //     token: { type: String },
        //     displayName: { type: String },
        //     username: { type: String }
        // },
        // google: {
        //     id: { type: String },
        //     token: { type: String },
        //     name: { type: String }
        // },
        // roles: [{
        //     code: String,
        //     name: { en: { type: String }, es: { type: String } },
        //     default: Boolean
        // }],
        // managesTo: [{
        //     teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
        // }],
        // playsOn: [{
        //     teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
        //     shirtNumber: Number,
        //     position: {
        //         id: { type: Schema.Types.ObjectId, ref: 'Position' },
        //         code: String,
        //         name: { en: { type: String }, es: { type: String } }
        //     }
        // }],
        isActive: { type: Boolean, default: true },
        inactiveDate: { type: Date }
    },
    { timestamps: true }
);

export const UserSchema: Model<IUserDocument> = model<IUserDocument>('User', user);
