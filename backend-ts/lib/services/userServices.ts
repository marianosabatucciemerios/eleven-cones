import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { UtilServices } from './utilServices';
import * as moment from 'moment';
import * as _ from 'lodash';
import { PositionSchema } from 'models/positionModel';


const User = mongoose.model('User', UserSchema);
const Position = mongoose.model('Position', PositionSchema);

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
        return new Promise(function (resolve, reject) {
            if (!password) {
                return reject({
                    code: "USER00024",
                    message: "Password cannot be empty"
                });
            }
    
            if (password.length < 8) {
                return reject({
                    code: "USER00025",
                    message: "Password should be 8 characters or longer"
                });
            }
    
            return resolve();
        });
    }

    public encryptPassword(password) {

    }

    public validateBirthdate(birthdate) {
        return new Promise(function (resolve, reject) {
            if (!moment(birthdate).isValid())
                return reject({
                    code: "USER00030",
                    message: "Birthdate is not valid."
                });
    
            return resolve();
        });
    }

    public validateHeight(unit, value) {
        return new Promise(function (resolve, reject) {
            if (unit !== 'CM' && unit !== 'IN')
                return reject({
                    code: "USER00040",
                    message: "Height unit is not valid."
                });
    
            if (!_.isNumber(_.toNumber(value)))
                return reject({
                    code: "USER00041",
                    message: "Height value is not valid."
                });
    
            return resolve();
        });
    }

    public validateWeight(unit, value) {
        return new Promise(function (resolve, reject) {
            if (unit !== 'KG' && unit !== 'LB')
                return reject({
                    code: "USER00040",
                    message: "Weight unit is not valid."
                });
    
            if (!_.isNumber(_.toNumber(value)))
                return reject({
                    code: "USER00041",
                    message: "Weight value is not valid."
                });
    
            return resolve();
        });
    }

    public validateShirtNumber(shirtNumber) {
        return new Promise(function (resolve, reject) {
            if (!_.isNumber(shirtNumber))
                return reject({
                    code: "USER00050",
                    message: "Shirt Number is not valid."
                });
    
            return resolve();
        });
    }

    public validatePosition(position) {
        return new Promise(function (resolve, reject) {
            return Position.findByCode(position)
                .then(function (data) {
                    return resolve(data);
                })
                .catch(function (err) {
                    return reject({
                        code: "USER00060",
                        message: "Position is not valid." + err
                    });
                });
        });
    }

    public validateFoot(foot) {
        return new Promise(function (resolve, reject) {
            if (foot !== 'R' && foot !== 'L' && foot !== 'B')
                return reject({
                    code: "USER00070",
                    message: "Strong Foot is not valid."
                });
    
            return resolve();
        });
    }

    public validatePhoto(photo) {
        return new Promise(function (resolve, reject) {


        });
    }

    public createUser(firstName, lastName, email, password) {
        return new Promise(function (resolve, reject) {
            User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                local: {
                    password: exports.encryptPassword(password)
                }
            })
                .then(function (data) {
                    data.local = null;
                    resolve(data);
                })
                .catch(function (err) {
                    reject({
                        code: "USER00030",
                        message: "Some error occurred while creating the user."
                    });
                });
        });
    }

    public updateUser(curentUserId, updateValues) {
        return new Promise(function (resolve, reject) {
            User.findByIdAndUpdate(curentUserId, updateValues)
                .then(function () {
                    resolve();
                })
                .catch(function (err) {
                    reject({
                        code: "USER00030",
                        message: "Some error occurred while updateing user." + err
                    });
                })
        });
    }

    public getUser(id) {
        return new Promise(function (resolve, reject) {
            return User.findById(id, '-local')
                .then(function (data) {
                    return resolve(data);
                })
                .catch(function (err) {
                    return reject({
                        code: "USER00100",
                        message: "User not found is not valid." + err
                    });
                });
        });
    }
};