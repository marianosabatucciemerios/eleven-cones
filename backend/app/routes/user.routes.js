module.exports = function(app) {

    var users = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/v1/users', users.create);

    // Retrieve all users
    app.get('/v1/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/v1/users/:userId', users.findOne);

    // Update a Note with noteId
    app.put('/v1/users/:userId', users.update);

    // Delete a Note with noteId
    app.delete('/v1/users/:userId', users.delete);
}
