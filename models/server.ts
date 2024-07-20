import express, { Express } from "express";
import cors from "cors";
import { dbConnection } from "../database/config";
import routerUser from "../routes/auth";
import routerOrder from "../routes/order";

export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  ordersPath: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/auth";
    this.ordersPath = "/orders";

    //Funciones
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB(): Promise<void> {
    await dbConnection();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes(): void {
    this.app.use(this.authPath, routerUser);
    this.app.use(this.ordersPath, routerOrder);
  }
  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
