var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var dbConfig = require('./config/database.config.js');
var config = require('./config/passport.config.js');

var app = express();

/////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/////////////////////////

// Configuring the database

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.databaseUrl);

mongoose.connection.on('error', function () {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
})

/////////////////////////

// Require Notes routes
require('./app/routes/team.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/auth.routes.js')(app);

/////////////////////////

// listen for requests
app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});