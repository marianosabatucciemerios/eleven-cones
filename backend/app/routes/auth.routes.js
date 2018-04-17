module.exports = function(app) {

    var auth = require('../controllers/auth.controller.js');

    app.post('/v1/auth/register', auth.register);

    app.get('/v1/auth/me', auth.me);

}