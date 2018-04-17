var User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config/passport.config.js');
//
exports.register = function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        info: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        local: {
            email: req.body.email,
            password: hashedPassword
        }
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user." + err)
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
};

exports.me = function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        //res.status(200).send(decoded);
        User.findById(decoded.id, {local: 0},
            function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");

                res.status(200).send(user);
            });
    });
}