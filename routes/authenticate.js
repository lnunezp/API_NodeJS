'use strict';

const db = require("../config/db");
const express = require("express");
const authenticateController = require("../services/authenticate");
const cors = require("cors");
const app = express();

/**
 * Habilita CORS
 */
app.route(cors());

app.route('/v1/Account/Login')
    .post(authenticateController.post);

module.exports = app;
