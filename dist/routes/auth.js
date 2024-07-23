"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const validacionesDB_1 = require("../helpers/validacionesDB");
const auth_1 = require("../controllers/auth");
//Crear una instancia de Router
const routerUser = (0, express_1.Router)();
//1ero la ruta POST, 2do las validaciones y 3ro el controlador
routerUser.post("/register", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(), //no debe estar vacio
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña debe tener 6 carácteres").isLength({
        min: 6,
    }),
    // Validación personalizada: Verificar si el email ya existe en la base de datos
    (0, express_validator_1.check)("email").custom(validacionesDB_1.existeEmail),
    //Función que recolecta estos errores:
    recolectarErrores_1.recolectarErrores,
], 
// Controlador para manejar la lógica de registro
auth_1.register);
routerUser.post("/login", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    recolectarErrores_1.recolectarErrores,
], auth_1.login);
routerUser.patch("/verify", [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("code", "El codigo de verificación es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores,
], auth_1.verifyUser);
exports.default = routerUser;
