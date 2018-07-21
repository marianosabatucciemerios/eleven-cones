module.exports = function(app) {

    var users = require('../controllers/user.controller.js');
    
    app.post('/v1/users', users.create);
    
    app.put('/v1/users/:userId', users.update);
    
    // app.get('/v1/users', users.getAll);

    app.get('/v1/users/:userId', users.getById);

    // app.delete('/v1/users/:userId', users.delete);
}
