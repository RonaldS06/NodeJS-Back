import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario, { IUser } from "../models/usuario";

// Middleware para validar el token JWT
const validarJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Extraemos el token de los headers
  const token = req.headers["x-token"] as string;

  // Si no hay token, enviamos un error
  if (!token) {
    res.status(401).json({
      msg: "No hay token en la petición",
    });
    return;
  }

  //Empieza la verificación del JWT
  try {
    const claveSecreta = process.env.CLAVESECRETA as string; // Clave secreta para verificar el token
    const payload = jwt.verify(token, claveSecreta) as JwtPayload; // Verificamos el token y extraemos el payload
    const { id } = payload; // Extraemos el ID del usuario del payload

    // Buscamos el usuario en la base de datos usando el ID del token
    const usuarioConfirmado: IUser | null = await Usuario.findById(id);
    if (!usuarioConfirmado) {
      res.status(401).json({ msg: "Token no válido" });
      return;
    }

    // Añadimos el usuario confirmado y su ID al cuerpo de la solicitud
    req.body.usuarioConfirmado = usuarioConfirmado;
    req.body.id = id;

    // Pasamos al siguiente middleware/controlador
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no válido" });
  }
};

export default validarJWT;
