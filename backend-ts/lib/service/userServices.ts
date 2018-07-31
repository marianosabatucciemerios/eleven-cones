import { UserSchema } from "../models/userModel";
import { PositionSchema } from "../models/positionModel";
import { UtilServices } from "../service/utilServices";
//Falta importar bcryptjs
import * as moment from 'moment';
import * as _ from 'lodash';

export class UserServices {

    public utils: UtilServices = new UtilServices();

    public validateFirstName(firstName) {
        let patterns = this.utils.getPatternKey('ALPHA_SUPER');
        return new Promise(function (resolve, reject) {
            if (!firstName) {
                return reject({
                    code: "USER00010",
                    message: "First Name cannot be empty."
                });
            }

            if (!patterns.test(String(firstName))) {
                return reject({
                    code: "USER00011",
                    message: "First Name is invalid."
                });
            }
            return resolve();
        });
    }

    public validateLastName(lastName) {
        let patterns: any = this.utils.getPatternKey('ALPHA_SUPER');

        return new Promise(function (resolve, reject) {
            if (!lastName) {
                return reject({
                    code: "USER00012",
                    message: "Last Name cannot be empty."
                });
            }

            if (!patterns.test(String(lastName))) {
                return reject({
                    code: "USER00013",
                    message: "Last Name is invalid."
                });
            }
            return resolve();
        });
    }

    public validateEmail(email) {
        let patterns: any = this.utils.getPatternKey('EMAIL');

        return new Promise(function (resolve, reject) {

            if (!email) {
                return reject({
                    code: "USER00020",
                    message: "Email cannot be empty"
                });
            }

            if (!patterns.test(String(email))) {
                return reject({
                    code: "USER00021",
                    message: "Email not valid"
                });
            }

            return UserSchema.findByEmail(email)
                .catch((err) => {
                    return reject({
                        code: "USER00022",
                        message: "There was a problem retrieving the user." + err
                    });
                })
                .then((data) => {
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
        //Encriptado de password
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
            return PositionSchema.findByCode(position)
                .then((data) => {
                    return resolve(data);
                })
                .catch((err) => {
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
            UserSchema.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                local: {
                    password: exports.encryptPassword(password)
                }
            })
                .then((data) => {
                    data.local = null;
                    resolve(data);
                })
                .catch((err) => {
                    reject({
                        code: "USER00030",
                        message: "Some error occurred while creating the user."
                    });
                });
        });
    }

    public updateUser(curentUserId, updateValues) {
        return new Promise(function (resolve, reject) {
            UserSchema.findByIdAndUpdate(curentUserId, updateValues)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject({
                        code: "USER00030",
                        message: "Some error occurred while updateing user." + err
                    });
                })
        });
    }

    public getUser(id) {
        return new Promise(function (resolve, reject) {
            return UserSchema.findById(id, '-local')
                .then((data) => {
                    return resolve(data);
                })
                .catch((err) => {
                    return reject({
                        code: "USER00100",
                        message: "User not found is not valid." + err
                    });
                });
        });
    }
};

