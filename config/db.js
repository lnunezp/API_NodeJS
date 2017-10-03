'use strict';

const jwt = require("jsonwebtoken");
const config = require('./config');
const dbConfig = require('./configDBConnection');

/**
 * Ejecuta las llamadas a bases de datos según configuración (MSSQL, MySQL, PGSQL)
 */
switch (config.globalConfig.driverDataBase) {
    case 1: // Ejecuta sentencias en base de datos SQLServer
        const sql = require("mssql");
        // isuathorize indica si la llamada es para realizar un login 0 = Query normal, 1 = Generar JWT
        var executeQuery = function (res, query, isuathorize) {
            sql.connect(dbConfig.ConfigMSSQL, function (err) {
                if (err) {
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                    sql.close();
                } else {
                    // create Request object
                    var request = new sql.Request();
                    // query to the database
                    request.query(query, function (error, result) {
                        if (err) {
                            console.log("Error while querying database :- " + err);
                            res.json(err);
                        }
                        else {
                            if (isuathorize == 0) {
                                res.json(result.recordset);
                            }
                            else {
                                if (result.rowsAffected > 0) {
                                    // create access token JWT
                                    var date = new Date();
                                    var tokenData = {
                                        expires_in: date.setMinutes(config.globalConfig.tokenTimeOut),
                                        token_type: "Bearer",
                                        access_token: jwt.sign(result.recordset[0], config.globalConfig.privateKey)
                                    }
                                } else {
                                    var tokenData = {
                                        error: "USERNAME_OR_PASSWORD_INCORRECT",
                                        error_description: "El usuario o contraseña no son correctos"
                                    }
                                }
                            }
                            res.json(tokenData);
                        }
                        sql.close();
                    });
                }
            });
        };
        break;
    case 2: // Ejecuta sentencias en base de datos MySQL
        const mysql = require("mysql");

        var executeQuery = function (res, query, isuathorize) {
            var conn = mysql.createConnection(dbConfig.ConfigMySQL);
            conn.connect(conn, function (err) {
                conn.query(query, function (err, result) {
                    if (err) {
                        console.log("Error while querying database :- " + err);
                        res.json(err);
                    }
                    else {
                        if (isuathorize == 0) {
                            res.json(result);
                            console.log(result);
                        } else {
                            if (result.length > 0) {
                                // create access token JWT
                                var date = new Date();
                                var tokenData = {
                                    expires_in: date.setMinutes(config.globalConfig.tokenTimeOut),
                                    token_type: "Bearer",
                                    access_token: jwt.sign(JSON.stringify(result[0]), config.globalConfig.privateKey)
                                }
                            } else {
                                var tokenData = {
                                    error: "USERNAME_OR_PASSWORD_INCORRECT",
                                    error_description: "El usuario o contraseña no son correctos"
                                }
                            }
                            res.json(tokenData)
                        }
                    }
                    conn.end();
                });
            });
        };
        break;
    case 3: // Ejecuta sentencias en base de datos Postgres SQL
        const pgsql = require('pg');
        const conn = 'postgres://' + dbConfig.ConfigPgSQL.username + ':' + dbConfig.ConfigPgSQL.password + '@' + dbConfig.ConfigPgSQL.server + ':' + dbConfig.ConfigPgSQL.port + '/' + dbConfig.ConfigPgSQL.database;

        var executeQuery = function (res, query, isuathorize) {
            const client = new pgsql.Client(conn);
            client.connect(function (err) {
                if (err) {
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                    client.end();
                } else {
                    //var request = new client.Request();
                    client.query(query, function (err, result) {
                        if (err) {
                            console.log("Error while connecting database :- " + err);
                            res.send(err);
                        } else {
                            if (isuathorize == 0) {
                                res.json(result.rows);
                            }
                            else {
                                // create access token JWT
                                var date = new Date();
                                var tokenData = {
                                    expires_in: date.setMinutes(config.globalConfig.tokenTimeOut),
                                    token_type: "Bearer",
                                    access_token: jwt.sign(JSON.stringify(result.rows[0]), config.globalConfig.privateKey)
                                }
                                res.json(tokenData);
                            }
                        }
                        client.end();
                    });
                }
            });
        }
        break;
}

exports.executeQuery = executeQuery;
