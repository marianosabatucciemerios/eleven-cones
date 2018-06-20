module.exports = function(app) {

    var auth = require('../controllers/auth.controller.js');

    app.post('/v1/auth/signup/local', auth.singupLocal);

    // // app.post('/v1/auth/signup/fb', auth.singupFb);

    // // app.post('/v1/auth/signup/google', auth.singupGoogle);

    app.post('/v1/auth/login', auth.login);

    // app.post('/v1/auth/login', auth.logout);

    app.get('/v1/users/me', auth.me);

}