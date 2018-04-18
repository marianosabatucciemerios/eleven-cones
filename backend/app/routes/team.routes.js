module.exports = function(app) {

    var teams = require('../controllers/team.controller.js');

    // Create a new Note
    app.post('/v1/teams', teams.create);

    // Retrieve all teams
    app.get('/v1/teams', teams.findAll);

    // Retrieve a single Note with noteId
    app.get('/v1/teams/:teamId', teams.findById);

    // Update a Note with noteId
    app.put('/v1/teams/:teamId', teams.update);

    // Delete a Note with noteId
    app.delete('/v1/teams/:teamId', teams.delete);
}