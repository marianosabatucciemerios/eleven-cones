module.exports = function(app) {

    var teams = require('../controllers/team.controller.js');

    app.post('/v1/teams', teams.create);

    app.put('/v1/teams/:teamId', teams.update);

    //app.get('/v1/teams', teams.findAll);

    //app.get('/v1/teams/:teamId', teams.findById);

    //app.delete('/v1/teams/:teamId', teams.delete);
}