import Usuario, { IUser } from "../models/usuario";
import { sendEmail } from "../mailer.ts/mailer";

// Función para verificar la existencia del email y su estado de verificación
export const existeEmail = async (email: string): Promise<void> => {
  const existeMail: IUser | null = await Usuario.findOne({ email });

  //Cumplir con las 2 condiciones para que este registrado completamente
  if (existeMail && existeMail.verified) {
    throw new Error(`El correo ${email} ya está registrado`);
  }

  // Si el email existe pero no está verificado, enviar un nuevo código de verificación por correo
  if (existeMail && !existeMail.verified) {
    await sendEmail(email, existeMail.code as string);
    throw new Error(
      "El usuario ya está registrado. Se envió nuevamente el código"
    );
  }
};
