var Team = require('../models/team.model.js');

exports.create = function (req, res) {
    // Create and Save a new Team
    if (!req.body.name && !req.body.code) {
        return res.status(400).send({ 
            message: "Team can not be empty",
            content: req.body
        });
    }

    var team = new Team({
        name: req.body.name,
        code: req.body.code
    });

    team.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating the team." });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function (req, res) {
    // Retrieve and return all teams from the database.
    Team.find(function (err, teams) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving teams." });
        } else {
            res.send(teams);
        }
    });
};

exports.findById = function (req, res) {
    // Find a single team with a teamId
    Team.findById(req.params.teamId, function (err, team) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Team not found with id " + req.params.teamId });
            }
            return res.status(500).send({ message: "Error retrieving team with id " + req.params.teamId });
        }

        if (!team) {
            return res.status(404).send({ message: "Team not found with id " + req.params.teamId });
        }

        res.send(team);
    });
};

exports.update = function (req, res) {
    // Update a team identified by the teamId in the request
    Team.findById(req.params.teamId, function (err, team) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Team not found with id " + req.params.teamId });
            }
            return res.status(500).send({ message: "Error finding team with id " + req.params.teamId });
        }

        if (!team) {
            return res.status(404).send({ message: "Team not found with id " + req.params.teamId });
        }

        team.name = req.body.name;
        team.code = req.body.code;

        team.save(function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not update team with id " + req.params.teamId });
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function (req, res) {
    // Delete a team with the specified teamId in the request
    Team.findByIdAndRemove(req.params.teamId, function (err, team) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Team not found with id " + req.params.teamId });
            }
            return res.status(500).send({ message: "Could not delete team with id " + req.params.teamId });
        }

        if (!team) {
            return res.status(404).send({ message: "Team not found with id " + req.params.teamId });
        }

        res.send({ message: "Team deleted successfully!" })
    });
};
