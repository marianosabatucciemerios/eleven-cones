module.exports = function(app) {

    var auth = require('../controllers/auth.controller.js');

    app.post('/v1/auth/register/local', auth.register);

    // app.post('/v1/auth/register/fb', auth.register);

    // app.post('/v1/auth/register/google', auth.register);

    app.get('/v1/auth/me', auth.me);

}