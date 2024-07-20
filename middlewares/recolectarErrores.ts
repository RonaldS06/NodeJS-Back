import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

// Función para recolectar y manejar errores de validación
export const recolectarErrores = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Obtiene los resultados de la validación del request
  const errors: Result<ValidationError> = validationResult(req);

  // Si hay errores en la validación
  if (!errors.isEmpty()) {
    // Responde con un estado 400 (Bad Request) y los errores en formato JSON
    res.status(400).json({errors});
  } else {
    // Si no hay errores, continúa con el siguiente middleware
    next();
  }
};
