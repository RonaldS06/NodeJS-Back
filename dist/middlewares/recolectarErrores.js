"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recolectarErrores = void 0;
const express_validator_1 = require("express-validator");
// Función para recolectar y manejar errores de validación
const recolectarErrores = (req, res, next) => {
    // Obtiene los resultados de la validación del request
    const errors = (0, express_validator_1.validationResult)(req);
    // Si hay errores en la validación
    if (!errors.isEmpty()) {
        // Responde con un estado 400 (Bad Request) y los errores en formato JSON
        res.status(400).json({ errors });
    }
    else {
        // Si no hay errores, continúa con el siguiente middleware
        next();
    }
};
exports.recolectarErrores = recolectarErrores;
