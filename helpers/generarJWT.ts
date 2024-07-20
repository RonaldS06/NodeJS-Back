import jwt from "jsonwebtoken";

const generarJWT = (id: string = ""): Promise<string> => {
  return new Promise((res, rej) => {
    // Crear el payload con el ID del usuario
    const payload = { id };

    // Firmar el token con el payload, clave secreta y opciones
    jwt.sign(
      payload, // El payload que se incluirá en el token
      process.env.CLAVESECRETA as string, // Clave secreta para firmar el token, convertida a string
      { expiresIn: "1h" }, //expiración de 1 hora
      // Callback que maneja el resultado de la firma
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.error(err);
          // Rechaza la promesa con un mensaje de error
          rej("No se ha podido generar el token");
        } else {
          // Si no hay error, resuelve la promesa con el token generado
          res(token as string);
        }
      }
    );
  });
};

export default generarJWT;
