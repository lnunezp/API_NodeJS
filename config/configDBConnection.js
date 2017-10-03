'use strict';

/**
 * Inicializa variables de configuración de conexión a bases de datos
 */
var ConfigMSSQL = {
    user: "sa",
    password: "123Momia",
    server: "localhost",
    database: "BD_Base",
    port: 1433,
    options: {},
    stream: false,
    parseJSON: false
};

const ConfigMySQL = {
    host: "localhost",
    user: "root",
    password: "123Momia",
    database: "BD_Base"
};

const ConfigPgSQL = {
    server: 'localhost',
    port: 5432,
    database: 'BD_Base',
    username: 'postgres',
    password: '123Momia',
};

exports.ConfigMSSQL = ConfigMSSQL;
exports.ConfigMySQL = ConfigMySQL;
exports.ConfigPgSQL = ConfigPgSQL;
