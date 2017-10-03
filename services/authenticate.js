'use strict';

const db = require("../config/db");
const crypto = require("crypto");

/**
 * Autentica al usuario y retorna un JWT
 */
exports.post = function (req, res) {
    var userName = req.body.user;
    var password = req.body.password;
    var cipher = crypto.createHash('md5').update(password).digest('hex');
    var query = "select usua_token as primarysid, concat(usua_nombre, ' ', usua_apellido) as unique_name, usua_mail as email from mae_usuario where usua_nombre_usuario='" + userName + "' and usua_password='" + cipher + "'";
    db.executeQuery(res, query, 1);
};
