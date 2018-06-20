var User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config/passport.config.js');

exports.singupLocal = function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 10);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // -- VALIDATIONS -- //

    // First Name
    if (!req.body.firstName) {
        return res.status(400).send({
            code: "AUTH00010",
            message: "First Name cannot be empty"
        });
    }

    // Last Name
    if (!req.body.lastName) {
        return res.status(400).send({
            code: "AUTH00020",
            message: "Last Name cannot be empty"
        });
    }

    // Password
    if (!req.body.password) {
        return res.status(400).send({
            code: "AUTH00040",
            message: "Password cannot be empty"
        });
    }

    if (req.body.password.length < 8) {
        return res.status(400).send({
            code: "AUTH00041",
            message: "Password should be 8 characters or longer"
        });
    }

    // Email Name
    if (!req.body.email) {
        return res.status(400).send({
            code: "AUTH00030",
            message: "Email cannot be empty"
        });
    }

    if (!re.test(String(req.body.email).toLowerCase())) {
        return res.status(400).send({
            code: "AUTH00031",
            message: "Email not valid"
        });
    }

    User.findByEmail(req.body.email, function (err, user) {
        if (err)
            return res.status(500).send({
                code: "AUTH00032",
                message: "There was a problem retrieving the user." + err
            });

        if (user)
            return res.status(400).send({
                code: "AUTH00033",
                message: "Email already taken."
            });

        if (!user) {
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                local: {
                    password: hashedPassword
                }
            },
                function (err, user) {
                    if (err)
                        return res.status(500).send({
                            code: "AUTH00040",
                            message: "There was a problem registering the user." + err
                        })

                    // create a token
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return res.status(200).send({
                        auth: true,
                        token: token
                    });
                });
        }
    })
};

exports.login = function (req, res) {

    if (!req.body.email) {
        return res.status(400).send({
            code: "LOGIN00010",
            message: "Email cannot be empty"
        });
    }

    if (!req.body.password) {
        return res.status(400).send({
            code: "LOGIN00020",
            message: "Password cannot be empty"
        });
    }

    User.findByEmail(req.body.email, function (err, user) {
        if (err)
            return res.status(500).send({
                code: "LOGIN00030",
                message: "User does not exit."
            });

        if (user) {

            bcrypt.compare(req.body.password, user.local.password, function (err, resPwd) {
                if (err) {
                    return res.status(500).send({
                        code: "LOGIN00031",
                        message: "Error authenticating user."
                    });
                }

                if (resPwd) {
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    return res.status(200).send({
                        auth: true,
                        token: token
                    });
                }

                return res.status(400).send({
                    code: "LOGIN00031",
                    message: "User or password is not correct."
                });

            });
        }
    });
};

exports.me = function (req, res) {

    var getUserInfo = function (decoded) {

        return User.findById(decoded.id, { local: 0 }, function (err, user) {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'There was a problem finding the user.'
                });
            }

            if (!user) {
                return res.status(404).send({
                    auth: false,
                    message: 'User not found.'
                });
            }

            return res.status(200).send(user);
        });
    }

    return jwtServices.validateJwt(req, res, getUserInfo);

};