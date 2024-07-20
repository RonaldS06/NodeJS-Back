import { NextFunction, Request, Response } from "express";

// Middleware para verificar si el usuario está verificado
export const isVerified = (req: Request, res: Response, next: NextFunction) => {
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

export default isVerified;
