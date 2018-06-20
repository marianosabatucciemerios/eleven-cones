var User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Q = require("q");
var config = require('../../config/passport.config.js');
var jwtServices = require('../services/jwt.services.js');
var userServices = require('../services/user.services.js');

exports.create = function (req, res) {

    Q.all([
        userServices.validateName(req.body.firstName, req.body.lastName),
        userServices.validateEmail(req.body.email),
        userServices.validatePassword(req.body.password)
    ])
        .then(function () {
            userServices.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
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

    userServices.getUser(req.params.userId)
        .then(function (currentUser) {

            var validations = [];

            if (currentUser.firstName != req.firstName || currentUser.lastName != req.lastName)
                validations.push('userServices.validateName');

            if (currentUser.email != req.email)
                validations.push('userServices.validateEmail');

            if (currentUser.height.value != req.heightValue)
                validations.push('userServices.validateHeight');

            if (currentUser.weight.value != req.weightValue)
                validations.push('userServices.validateWeight');


            // Falta hacer las validaciones previas al update
            // para saber si el campo fue modificado o no
            // Una vez sabido eso se puede hacer el update a la BD


            // Q.all([

            // ])
            //     .then(function() {

            //     })
            //     .catch(function() {

            //     });

        })
        .catch(function (err) {
            return res.status(400).send(err)
        });

};


// exports.getAll = function (req, res) {
//     // Retrieve and return all users from the database.
//     User.find(function (err, users) {
//         if (err) {
//             console.log(err);
//             res.status(500).send({ message: "Some error occurred while retrieving users." });
//         } else {
//             res.send(users);
//         }
//     });
// };

// exports.getById = function (req, res) {
//     // Find a single user with a userID
//     User.findById(req.params.userID, function (err, user) {
//         if (err) {
//             console.log(err);
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({ message: "User not found with id " + req.params.userId });
//             }
//             return res.status(500).send({ message: "Error retrieving user with id " + req.params.userId });
//         }

//         if (!user) {
//             return res.status(404).send({ message: "User not found with id " + req.params.userId });
//         }

//         res.send(user);
//     });
// };

// exports.getByEmail = function (email, err) {
//     return User.findOne({ 'email': email }, function (err, user) {
//         return err ? err : user
//     });


//     // User.findById(req.params.userID, function (err, user) {
//     //     if (err) {
//     //         console.log(err);
//     //         if (err.kind === 'ObjectId') {
//     //             return res.status(404).send({ message: "User not found with id " + req.params.userId });
//     //         }
//     //         return res.status(500).send({ message: "Error retrieving user with id " + req.params.userId });
//     //     }

//     //     if (!user) {
//     //         return res.status(404).send({ message: "User not found with id " + req.params.userId });
//     //     }

//     //     res.send(user);
//     // });
// };

// exports.update = function (req, res) {
//     // Update a user identified by the userId in the request
//     User.findById(req.params.userId, function (err, user) {
//         if (err) {
//             console.log(err);
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({ message: "User not found with id " + req.params.userId });
//             }
//             return res.status(500).send({ message: "Error finding user with id " + req.params.userId });
//         }

//         if (!user) {
//             return res.status(404).send({ message: "User not found with id " + req.params.userId });
//         }

//         user.firstName = req.body.firstName;
//         user.lastName = req.body.lastName;

//         user.save(function (err, data) {
//             if (err) {
//                 res.status(500).send({ message: "Could not update user with id " + req.params.userId });
//             } else {
//                 res.send(data);
//             }
//         });
//     });
// };

// exports.delete = function (req, res) {
//     // Delete a User with the specified userId in the request
//     User.findByIdAndRemove(req.params.userId, function (err, user) {
//         if (err) {
//             console.log(err);
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({ message: "User not found with id " + req.params.userId });
//             }
//             return res.status(500).send({ message: "Could not delete user with id " + req.params.userId });
//         }

//         if (!user) {
//             return res.status(404).send({ message: "User not found with id " + req.params.userId });
//         }

//         res.send({ message: "User deleted successfully!" })
//     });
// };
