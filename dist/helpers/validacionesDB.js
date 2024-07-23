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
exports.existeEmail = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const mailer_1 = require("../mailer.ts/mailer");
// Función para verificar la existencia del email y su estado de verificación
const existeEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existeMail = yield usuario_1.default.findOne({ email });
    //Cumplir con las 2 condiciones para que este registrado completamente
    if (existeMail && existeMail.verified) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
    // Si el email existe pero no está verificado, enviar un nuevo código de verificación por correo
    if (existeMail && !existeMail.verified) {
        yield (0, mailer_1.sendEmail)(email, existeMail.code);
        throw new Error("El usuario ya está registrado. Se envió nuevamente el código");
    }
});
exports.existeEmail = existeEmail;
