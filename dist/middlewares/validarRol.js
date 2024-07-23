"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../helpers/constants");
// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
    // Extraemos el rol del usuario autenticado
    const { rol } = req.body.usuarioConfirmado;
    // Si el rol no es de administrador, enviamos un error
    if (rol !== constants_1.ROLES.admin) {
        res.status(401).json({ msg: "El usuario no es administrador" });
        return;
    }
    // Si el rol es de administrador, pasamos al siguiente middleware/controlador
    next();
};
exports.default = isAdmin;
