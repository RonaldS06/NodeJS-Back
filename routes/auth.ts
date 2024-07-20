import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existeEmail } from "../helpers/validacionesDB";
import { login, register, verifyUser } from "../controllers/auth";
//Crear una instancia de Router
const routerUser = Router();

//1ero la ruta POST, 2do las validaciones y 3ro el controlador
routerUser.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(), //no debe estar vacio
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe tener 6 carácteres").isLength({
      min: 6,
    }),
    // Validación personalizada: Verificar si el email ya existe en la base de datos
    check("email").custom(existeEmail),
    //Función que recolecta estos errores:
    recolectarErrores,
  ],
  // Controlador para manejar la lógica de registro
  register
);

routerUser.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    recolectarErrores,
  ],
  login
);

routerUser.patch(
  "/verify",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("code", "El codigo de verificación es obligatorio").not().isEmpty(),
    recolectarErrores,
  ],
  verifyUser
);

export default routerUser;
