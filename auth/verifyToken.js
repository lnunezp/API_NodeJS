'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Verifica que la cabecera de autenticación sea válida
 */
function verifyToken(req, res, next) {
    var token = req.headers['authorization'];

    if (!token)
        return res.status(403).send({
            error: "invalid_request",
            code: "BEARER_TOKEN_NOT_FOUND",
            error_description: "No se ha encontrado la cabecera de autenticación requerida"
        });
    jwt.verify(token.replace('Bearer ', ''), config.globalConfig.privateKey, function (err, decoded) {
        if (err)
            return res.status(500).send({
                error: "invalid_token",
                code: "INVALID_TOKEN",
                error_description: null
            });
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
