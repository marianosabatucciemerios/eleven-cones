var jwt = require('jsonwebtoken');
var config = require('../../config/passport.config.js');

exports.validateJwt = function (req, res, callback) {

    var token = req.headers['x-access-token'];

    if (!token) {
        return res.status(500).send({
            code: 'TOKEN0001',
            message: 'No token provided.'
        });
    }

    try {
        return callback(jwt.verify(token, config.secret));

    } catch (err) {
        return res.status(500).send({
            code: 'TOKEN0002',
            message: 'Failed to authenticate token.'
        });
    }
};