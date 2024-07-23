"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
// Middleware para validar el token JWT
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraemos el token de los headers
    const token = req.headers["x-token"];
    // Si no hay token, enviamos un error
    if (!token) {
        res.status(401).json({
            msg: "No hay token en la petición",
        });
        return;
    }
    //Empieza la verificación del JWT
    try {
        const claveSecreta = process.env.CLAVESECRETA; // Clave secreta para verificar el token
        const payload = jsonwebtoken_1.default.verify(token, claveSecreta); // Verificamos el token y extraemos el payload
        const { id } = payload; // Extraemos el ID del usuario del payload
        // Buscamos el usuario en la base de datos usando el ID del token
        const usuarioConfirmado = yield usuario_1.default.findById(id);
        if (!usuarioConfirmado) {
            res.status(401).json({ msg: "Token no válido" });
            return;
        }
        // Añadimos el usuario confirmado y su ID al cuerpo de la solicitud
        req.body.usuarioConfirmado = usuarioConfirmado;
        req.body.id = id;
        // Pasamos al siguiente middleware/controlador
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Token no válido" });
    }
});
exports.default = validarJWT;
