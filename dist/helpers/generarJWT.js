"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (id = "") => {
    return new Promise((res, rej) => {
        // Crear el payload con el ID del usuario
        const payload = { id };
        // Firmar el token con el payload, clave secreta y opciones
        jsonwebtoken_1.default.sign(payload, // El payload que se incluirá en el token
        process.env.CLAVESECRETA, // Clave secreta para firmar el token, convertida a string
        { expiresIn: "1h" }, //expiración de 1 hora
        // Callback que maneja el resultado de la firma
        (err, token) => {
            if (err) {
                console.error(err);
                // Rechaza la promesa con un mensaje de error
                rej("No se ha podido generar el token");
            }
            else {
                // Si no hay error, resuelve la promesa con el token generado
                res(token);
            }
        });
    });
};
exports.default = generarJWT;
