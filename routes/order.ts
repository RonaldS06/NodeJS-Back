import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { createOrder, getOrders } from "../controllers/order";
import validarJWT from "../middlewares/validarJWT";
import isVerified from "../middlewares/validarVerificado";

const routerOrder = Router();

routerOrder.get("/", [validarJWT, recolectarErrores], getOrders);

routerOrder.post(
  "/",
  [
    validarJWT,
    isVerified,
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envio es obligatorio").not().isEmpty(),
    check("items", "El array de productos es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envio es obligatorio").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    recolectarErrores,
  ],
  createOrder
);

export default routerOrder;
