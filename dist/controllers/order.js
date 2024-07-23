"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
// Controlador para obtener todas las órdenes de un usuario específico
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraemos el ID del usuario confirmado del middleware.
    const usuarioId = req.body.usuarioConfirmado._id;
    // Creamos una consulta para buscar órdenes por el ID del usuario.
    const consulta = { user: usuarioId };
    // Realizamos la búsqueda en la colección `Order` con la consulta.
    const orders = yield order_1.default.find(consulta);
    // Enviamos la información de las órdenes encontradas al frontend en formato JSON.
    res.json({
        // Se utiliza el spread operator para copiar el array de órdenes.
        data: [...orders],
    });
});
exports.getOrders = getOrders;
// Controlador para crear una nueva orden
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraemos el ID del usuario confirmado del middleware.
    const usuario = req.body.usuarioConfirmado._id;
    // Extraemos los datos de la orden del cuerpo de la solicitud.
    const orderData = req.body;
    // Creamos un objeto `data` que combina los datos de la orden con el ID del usuario, la fecha de creación y el estado inicial de la orden.
    const data = Object.assign(Object.assign({}, orderData), { createdAt: new Date(), user: usuario, status: "pending" });
    const order = new order_1.default(data);
    yield order.save();
    res.status(201).json({
        data: order,
    });
});
exports.createOrder = createOrder;
