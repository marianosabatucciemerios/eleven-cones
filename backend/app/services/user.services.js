// var jwt = require('jsonwebtoken');
// var config = require('../../config/passport.config.js');
var User = require('../models/user.model.js');
var Position = require('../models/position.model.js');
var userServices = require('../services/util.services.js');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var _ = require('lodash');

var patterns = userServices.getPatterns();

exports.validateName = function (firstName, lastName) {

    return new Promise(function (resolve, reject) {
        if (!firstName) {
            return reject({
                code: "USER00010",
                message: "First Name cannot be empty."
            });
        }

        if (!patterns.ALPHA_SUPER.test(String(firstName))) {
            return reject({
                code: "USER00011",
                message: "First Name is invalid."
            });
        }

        if (!lastName) {
            return reject({
                code: "USER00012",
                message: "Last Name cannot be empty."
            });
        }

        if (!patterns.ALPHA_SUPER.test(String(lastName))) {
            return reject({
                code: "USER00013",
                message: "Last Name is invalid."
            });
        }

        return resolve();

    });

};

exports.validateEmail = function (email) {

    return new Promise(function (resolve, reject) {

        if (!email) {
            return reject({
                code: "USER00020",
                message: "Email cannot be empty"
            });
        }

        if (!patterns.EMAIL.test(String(email))) {
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

};

exports.validatePassword = function (password) {

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

};

exports.encryptPassword = function (password) {

    return bcrypt.hashSync(password, 10);

};

exports.validateBirthdate = function (birthdate) {

    return new Promise(function (resolve, reject) {
        if (!moment(birthdate).isValid())
            return reject({
                code: "USER00030",
                message: "Birthdate is not valid."
            });

        return resolve();
    });

};

exports.validateHeight = function (unit, value) {

    return new Promise(function (resolve, reject) {
        if (unit !== 'CM' && unit !== 'IN')
            return reject({
                code: "USER00040",
                message: "Height unit is not valid."
            });

        if (!_.isNumber(value))
            return reject({
                code: "USER00041",
                message: "Height value is not valid."
            });

        return resolve();
    });

};

exports.validateWeight = function (unit, value) {

    return new Promise(function (resolve, reject) {
        if (unit !== 'KG' && unit !== 'LB')
            return reject({
                code: "USER00040",
                message: "Weight unit is not valid."
            });

        if (!_.isNumber(value))
            return reject({
                code: "USER00041",
                message: "Weight value is not valid."
            });

        return resolve();
    });

};

exports.validateNumber = function (shirtNumber) {

    return new Promise(function (resolve, reject) {
        if (!_.isNumber(shirtNumber))
            return reject({
                code: "USER00050",
                message: "Shirt Number is not valid."
            });

        return resolve();
    });

};

exports.validatePosition = function (position) {

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

};

exports.validateFoot = function (foot) {

    return new Promise(function (resolve, reject) {
        if (foot !== 'R' && foot !== 'L' && foot !== 'B')
            return reject({
                code: "USER00070",
                message: "Strong Foot is not valid."
            });

        return resolve();
    });

};

exports.validatePhoto = function (photo) {

    return new Promise(function (resolve, reject) {


    });

};

exports.createUser = function (firstName, lastName, email, password) {

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

};

exports.updateUser = function (firstName, lastName, email, height, weight, number, position, foot, photo) {

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
            })
    });

};

exports.getUser = function (id) {

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

};