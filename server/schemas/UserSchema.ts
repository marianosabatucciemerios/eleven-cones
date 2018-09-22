import { Schema, Model, model } from 'mongoose';
import { IUserDocument } from '../interfaces/IUserDocument';

let user = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        picture: { data: Buffer, contentType: String },
        birthDate: { type: Date },
        strongFoot: {
            code: { type: String },
            name: { en: { type: String }, es: { type: String } }
        },
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
        email: { type: String, unique: true, lowercase: true },
        phone: {
            country: { type: String },
            number: { type: String }
        },
        local: {
            password: { type: String },
            passwordReset: { token: { type: String }, expired: { type: Date } }
        },
        facebook: {
            id: { type: String },
            token: { type: String },
            name: { type: String }
        },
        twitter: {
            id: { type: String },
            token: { type: String },
            displayName: { type: String },
            username: { type: String }
        },
        google: {
            id: { type: String },
            token: { type: String },
            name: { type: String }
        },
        roles: [{
            code: String,
            name: { en: { type: String }, es: { type: String } },
            default: Boolean
        }],
        managesTo: [{
            teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
        }],
        playsOn: [{
            teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
            shirtNumber: Number,
            position: {
                id: { type: Schema.Types.ObjectId, ref: 'Position' },
                code: String,
                name: { en: { type: String }, es: { type: String } }
            }
        }],
        isActive: Boolean
    },
    { timestamps: true }
);

export const UserSchema: Model<IUserDocument> = model<IUserDocument>('User', user);

// UserSchema.statics.findByEmail = function (email: string) {
//     return this.findOne({ 'email': email });
// }