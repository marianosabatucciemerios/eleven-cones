var User = require('../models/user.model.js');

exports.create = function (req, res) {
    // Create and Save a new User
    if (!req.body.firstName && !req.body.lastName) {
        return res.status(400).send({ 
            message: "User can not be empty",
            content: req.body
        });
    }

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    user.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating the user." });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function (req, res) {
    // Retrieve and return all users from the database.
    User.find(function (err, users) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving users." });
        } else {
            res.send(users);
        }
    });
};

exports.findById = function (req, res) {
    // Find a single user with a userID
    User.findById(req.params.userID, function (err, user) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "User not found with id " + req.params.userId });
            }
            return res.status(500).send({ message: "Error retrieving user with id " + req.params.userId });
        }

        if (!user) {
            return res.status(404).send({ message: "User not found with id " + req.params.userId });
        }

        res.send(user);
    });
};

exports.update = function (req, res) {
    // Update a user identified by the userId in the request
    User.findById(req.params.userId, function (err, user) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "User not found with id " + req.params.userId });
            }
            return res.status(500).send({ message: "Error finding user with id " + req.params.userId });
        }

        if (!user) {
            return res.status(404).send({ message: "User not found with id " + req.params.userId });
        }

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        user.save(function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not update user with id " + req.params.userId });
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function (req, res) {
    // Delete a User with the specified userId in the request
    User.findByIdAndRemove(req.params.userId, function (err, user) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "User not found with id " + req.params.userId });
            }
            return res.status(500).send({ message: "Could not delete user with id " + req.params.userId });
        }

        if (!user) {
            return res.status(404).send({ message: "User not found with id " + req.params.userId });
        }

        res.send({ message: "User deleted successfully!" })
    });
};
