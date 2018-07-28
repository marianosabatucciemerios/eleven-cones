import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { UtilServices } from './utilServices';

const User = mongoose.model('User', UserSchema);

export class UserServices {
    private patterns: any = this.utilService.patterns();

    constructor(
        private utilService: UtilServices
    ) { }

    public validateFirstName(firstName) {
        return new Promise(function (resolve, reject) {
            if (!firstName) {
                return reject({
                    code: "USER00010",
                    message: "First Name cannot be empty."
                });
            }
            if (!this.patterns.ALPHA_SUPER.test(String(firstName))) {
                return reject({
                    code: "USER00011",
                    message: "First Name is invalid."
                });
            }

            return resolve();
        });
    }

    public validateLastName(lastName) {
        return new Promise(function (resolve, reject) {
            if (!lastName) {
                return reject({
                    code: "USER00012",
                    message: "Last Name cannot be empty."
                });
            }
    
            if (!this.patterns.ALPHA_SUPER.test(String(lastName))) {
                return reject({
                    code: "USER00013",
                    message: "Last Name is invalid."
                });
            }
    
            return resolve();
    
        });
    }

    public validateEmail(email) {
        return new Promise(function (resolve, reject) {

            if (!email) {
                return reject({
                    code: "USER00020",
                    message: "Email cannot be empty"
                });
            }
    
            if (!this.patterns.EMAIL.test(String(email))) {
                return reject({
                    code: "USER00021",
                    message: "Email not valid"
                });
            }
    
            return User.findByEmail(email)
                .catch(function (err) {
                    return reject({
                        code: "USER00022",
                        message: "There was a problem retrieving the user." + err
                    });
                })
                //hay que ver como es el .then para typescript
                .then(function (data) {
                    if (data) {
                        return reject({
                            code: "USER00023",
                            message: "Email already taken."
                        });
                    }
    
                    return resolve();
                });
        });
    }

    public validatePassword(password) {

    }

};