// var User = require('../models/user.model.js');
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
var Q = require("q");
// var config = require('../../config/passport.config.js');
// var jwtServices = require('../services/jwt.services.js');
var userServices = require('../services/user.services.js');
// var _ = require('lodash');

exports.create = function (req, res) {

    Q.all([
        userServices.validateFirstName(req.body.firstName),
        userServices.validateLastName(req.body.lastName),
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
            var updateValues = {};

            // Mandatory fields
            if (currentUser.firstName != req.body.firstName) {
                validations.push(userServices.validateFirstName(req.body.firstName));
                updateValues.firstName = req.body.firstName;
            }

            if (currentUser.lastName != req.body.lastName) {
                validations.push(userServices.validateLastName(req.body.lastName));
                updateValues.lastName = req.body.lastName;
            }

            if (currentUser.email != req.body.email) {
                validations.push(userServices.validateEmail(req.body.email));
                updateValues.email = req.body.email;
            }

            // Optional fields
            if (req.body.birthdate) {
                if (currentUser.birthdate != req.body.birthdate) {
                    validations.push(userServices.validateBirthdate(req.body.birthdate));
                    updateValues.birthdate = req.body.birthdate;
                }
            }

            if (req.body.heightUnit && req.body.heightValue) {
                if (currentUser.height.value != req.body.heightValue) {
                    validations.push(userServices.validateHeight(req.body.heightUnit, req.body.heightValue));
                    updateValues.height = {
                        unit: { code: req.body.heightUnit },
                        value: req.body.heightValue
                    };
                }
            }

            if (req.body.weightUnit && req.body.weightValue) {
                if (currentUser.weight.value != req.body.weightValue) {
                    validations.push(userServices.validateWeight(req.body.weightUnit, req.body.weightValue));
                    updateValues.weight = {
                        unit: { code: req.body.weightUnit },
                        value: req.body.weightValue
                    };
                }
            }

            if (updateValues) {
                Q.all(validations)
                    .then(function () {
                        userServices.updateUser(req.params.userId, updateValues)
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

exports.getById = function (req, res) {
    userServices.getUser(req.params.userId)
        .then(function (data) {
            return res.status(200).send(data)
        })
        .catch(function (err) {
            return res.status(500).send(err)
        });
};

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
