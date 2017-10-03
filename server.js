'use strict';

//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const usersRoute = require('./routes/users');
const authenticateRoute = require('./routes/authenticate');
const config = require('./config/config');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YALM = require('yamljs');
const swaggerDocumment = YALM.load('./api/swagger/swagger.yaml');

app.use(bodyParser.json());
app.route(cors());
app.use(cors());

app.use('/', usersRoute);
app.use('/', authenticateRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumment));

/**
 * Setting up server
 */
var server = app.listen(process.env.PORT || config.globalConfig.portServer, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
