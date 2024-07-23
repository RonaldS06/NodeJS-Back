"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerified = void 0;
// Middleware para verificar si el usuario está verificado
const isVerified = (req, res, next) => {
    // Extraemos el estado de verificación del usuario
    const { verified } = req.body.usuarioConfirmado; //Objeto User
    // Si el usuario no está verificado, enviamos un error
    if (!verified) {
        res
            .status(401)
            .json({ msj: "El usuario no está correctamente verificado" });
        return;
    }
    // Si el usuario está verificado, pasamos al siguiente middleware/controlador
    next();
};
exports.isVerified = isVerified;
exports.default = exports.isVerified;
