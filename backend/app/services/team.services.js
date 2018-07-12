var Team = require('../models/team.model.js');
var utilServices = require('../services/util.services.js');
var moment = require('moment');
var _ = require('lodash');

var patterns = utilServices.getPatterns();

exports.validateName = function (name) {

    return new Promise(function (resolve, reject) {
        if (!name) {
            return reject({
                code: "TEAM00010",
                message: "Team Name cannot be empty."
            });
        }

        if (!patterns.ALPHA_SUPER.test(String(name))) {
            return reject({
                code: "TEAM00011",
                message: "Team Name is invalid."
            });
        }

        return resolve();
    });

};

exports.validateCode = function (code) {

    return new Promise(function (resolve, reject) {
        if (!code) {
            return reject({
                code: "TEAM00020",
                message: "Team Code cannot be empty."
            });
        }

        if (!patterns.ALPHA_NUMERIC.test(String(code))) {
            return reject({
                code: "TEAM00021",
                message: "Team Code is invalid."
            });
        }

        return resolve();
    });

};

exports.validateDescription = function (description) {

    return new Promise(function (resolve, reject) {
        if (!description) {
            return reject({
                code: "TEAM00030",
                message: "Team Description cannot be empty."
            });
        }

        if (!patterns.ALPHA_SUPER.test(String(description))) {
            return reject({
                code: "TEAM00031",
                message: "Team Description is invalid."
            });
        }

        return resolve();
    });

};

exports.validateYearBuilt = function (yearBuilt) {

    return new Promise(function (resolve, reject) {
        if (!moment(yearBuilt).isValid())
            return reject({
                code: "TEAM00040",
                message: "Team Year Built is not valid."
            });

        return resolve();
    });

};

exports.validateColor = function (color) {

    return new Promise(function (resolve, reject) {
        if (!patterns.COLOR.test(color)) {
            return reject({
                code: "TEAM00050",
                message: "Color " + color + " is invalid."
            });
        }

        return resolve();
    });

};

exports.createTeam = function (name, code, description, yearBuilt, primary, secondary) {
    return new Promise(function (resolve, reject) {
        Team.create({
            name: name,
            code: code,
            description: description,
            yearBuilt: yearBuilt,
            colors: {
                primary: primary,
                secondary: secondary
            }
        })
            .then(function (data) {
                resolve(data);
            })
            .catch(function (err) {
                reject({
                    code: "TEAM000%0",
                    message: "Some error occurred while creating the team."
                });
            });
    });
};

exports.updateTeam = function (currentTeamId, updateValues) {
    return new Promise(function (resolve, reject) {
        Team.findByIdAndUpdate(currentTeamId, updateValues)
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject({
                    code: "TEAM00090",
                    message: "Some error occurred while updateing team." + err
                });
            })
    });
};

exports.getTeam = function (id) {

    return new Promise(function (resolve, reject) {
        return Team.findById(id)
            .then(function (data) {
                return resolve(data);
            })
            .catch(function (err) {
                return reject({
                    code: "TEAM00100",
                    message: "Team not found is not valid." + err
                });
            });
    });

};