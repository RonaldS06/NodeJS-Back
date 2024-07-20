import { NextFunction, Response, Request } from "express";
import { ROLES } from "../helpers/constants";

// Middleware para verificar si el usuario es administrador
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Extraemos el rol del usuario autenticado
  const { rol } = req.body.usuarioConfirmado;

  // Si el rol no es de administrador, enviamos un error
  if (rol !== ROLES.admin) {
    res.status(401).json({ msg: "El usuario no es administrador" });
    return;
  }

  // Si el rol es de administrador, pasamos al siguiente middleware/controlador
  next();
};

export default isAdmin;
