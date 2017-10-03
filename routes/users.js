'use strict';

const db = require("../config/db");
const express = require("express");
const userServices = require("../services/users");
const cors = require("cors");
const app = express();
const VerifyToken = require('../auth/verifyToken');

/**
 * Habilita CORS
 */
app.route(cors());

app.route('/v1/User/List')
    .get(VerifyToken, function (req, res) {
        userServices.get(req, res);
    });

app.route('/v1/User/UserById')
    .get(VerifyToken, function (req, res) {
        userServices.getById(req, res);
    });

app.route('/v1/User/Create')
    .post(VerifyToken, function (req, res) {
        userServices.create(req, res);
    });

module.exports = app;
