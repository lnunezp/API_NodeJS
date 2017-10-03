'use strict';

const db = require("../config/db");
const express = require("express");
const crypto = require("crypto");

/**
 * Lista todos los registros
 */
exports.get = function (req, res) {
    var query = "select usua_nombre as name, usua_apellido as lastname, usua_nombre_usuario as username, usua_mail as mail, usua_activo as active, usua_token as token from mae_usuario";
    db.executeQuery(res, query, 0);
};

/**
 * Lista todos los registros filtrados por Id (Token)
 */
exports.getById = function (req, res) {
    var query = "select usua_nombre, usua_apellido, usua_nombre_usuario, usua_activo, usua_token, usua_mail from mae_usuario where usua_token = '" + req.query.id + "'";
    db.executeQuery(res, query, 0);
};

/**
 * Crea un registro
 */
exports.create = function (req, res) {
    var cipher = crypto.createHash('md5').update(req.body.password).digest('hex');
    var query = "insert into mae_usuario (usua_nombre, usua_apellido, usua_nombre_usuario, usua_password, usua_activo, usua_mail) values (" + req.body.name + "," + req.body.lastname + "," + req.body.username + "," + cipher + "," + req.body.mail + ")";
    console.log(query);
    db.executeQuery(res, query, 0);
}
