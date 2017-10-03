'use strict';
/**
 * Inicializa variables globales del servidor
 */
const globalConfig = {
    portServer: 8080, // puerto del servidor de aplicaciones
    smtpClient: "smtp.gmail.com",
    mailTo: "testsgr2017@gmail.com",
    passwordMail: "123Momia",
    portMail: 587,
    enableSSL: true,
    tokenTimeOut: 60, // tiempo de duración del token (JWT)
    privateKey: "OUE0MjM0RjI4MzRBRDQ3MDRBOEE3MTg2OUI4RDEyQTk=", // clave privada para generación de JWT
    driverDataBase: 1 // 1: SQLServr; 2: MySql; 3: Postgresql
};

exports.globalConfig = globalConfig;
