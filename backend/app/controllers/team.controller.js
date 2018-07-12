//var Team = require('../models/team.model.js');
var Q = require("q");
var teamServices = require('../services/team.services.js');

exports.create = function (req, res) {

    Q.all([
        teamServices.validateName(req.body.name),
        teamServices.validateCode(req.body.code),
        teamServices.validateDescription(req.body.description),
        teamServices.validateYearBuilt(req.body.yearBuilt),
        teamServices.validateColor(req.body.colorPrimary),
        teamServices.validateColor(req.body.colorSecondary)
    ])
        .then(function () {
            teamServices.createTeam(req.body.name, req.body.code, req.body.description, req.body.yearBuilt, req.body.colorPrimary, req.body.colorSecondary)
                .then(function (data) {
                    return res.status(201).send(data);
                })
                .catch(function (err) {
                    return res.status(400).send(err)
                });
        })
        .catch(function (err) {
            return res.status(400).send(err)
        });

};

exports.update = function (req, res) {

    teamServices.getTeam(req.params.teamId)
        .then(function (currentTeam) {

            var validations = [];
            var updateValues = {};

            // Mandatory fields
            if (currentTeam.name != req.body.name) {
                validations.push(teamServices.validateName(req.body.name));
                updateValues.name = req.body.name;
            }

            if (currentTeam.code != req.body.code) {
                validations.push(teamServices.validateName(req.body.code));
                updateValues.code = req.body.code;
            }

            // Optional fields
            if (req.body.description) {
                if (currentTeam.description != req.body.description) {
                    validations.push(teamServices.validateDescription(req.body.description));
                    updateValues.description = req.body.description;
                }
            }

            if (req.body.yearBuilt) {
                if (currentTeam.description != req.body.yearBuilt) {
                    validations.push(teamServices.validateYearBuilt(req.body.yearBuilt));
                    updateValues.yearBuilt = req.body.yearBuilt;
                }
            }

            if (req.body.colorPrimary) {
                if (currentTeam.description != req.body.colorPrimary) {
                    validations.push(teamServices.validateColor(req.body.colorPrimary));
                    updateValues.colorPrimary = req.body.colorPrimary;
                }
            }

            if (req.body.colorSecondary) {
                if (currentTeam.description != req.body.colorSecondary) {
                    validations.push(teamServices.validateColor(req.body.colorSecondary));
                    updateValues.colorSecondary = req.body.colorSecondary;
                }
            }


            if (updateValues) {
                Q.all(validations)
                    .then(function () {
                        teamServices.updateTeam(req.params.teamId, updateValues)
                            .then(function () {
                                return res.status(200).send()
                            })
                            .catch(function (err) {
                                return res.status(400).send(err)
                            })
                    })
                    .catch(function (err) {
                        return res.status(400).send(err)
                    });
            }

        })
        .catch(function (err) {
            return res.status(500).send(err)
        });

};