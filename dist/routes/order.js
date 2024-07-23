"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const order_1 = require("../controllers/order");
const validarJWT_1 = __importDefault(require("../middlewares/validarJWT"));
const validarVerificado_1 = __importDefault(require("../middlewares/validarVerificado"));
const routerOrder = (0, express_1.Router)();
routerOrder.get("/", [validarJWT_1.default, recolectarErrores_1.recolectarErrores], order_1.getOrders);
routerOrder.post("/", [
    validarJWT_1.default,
    validarVerificado_1.default,
    (0, express_validator_1.check)("price", "El precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "El costo de envio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("items", "El array de productos es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails", "Los detalles de envio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("total", "El total es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores,
], order_1.createOrder);
exports.default = routerOrder;
