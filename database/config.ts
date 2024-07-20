import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
  try {
    const dbURL = process.env.DB_URL;
    if (!dbURL) {
      throw new Error("La url no está correctamente definida");
    }
    await mongoose.connect(dbURL);
    console.log("Base de datos online");
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar la base de datos");
  }
};
