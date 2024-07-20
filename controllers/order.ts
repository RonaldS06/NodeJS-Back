import { Request, Response } from "express";
import Order, { IOrder } from "../models/order";
import { ObjectId } from "mongoose";

// Controlador para obtener todas las órdenes de un usuario específico
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  // Extraemos el ID del usuario confirmado del middleware.
  const usuarioId: ObjectId = req.body.usuarioConfirmado._id;
  // Creamos una consulta para buscar órdenes por el ID del usuario.
  const consulta = { user: usuarioId };
  // Realizamos la búsqueda en la colección `Order` con la consulta.
  const orders = await Order.find(consulta);
  // Enviamos la información de las órdenes encontradas al frontend en formato JSON.
  res.json({
    // Se utiliza el spread operator para copiar el array de órdenes.
    data: [...orders],
  });
};

// Controlador para crear una nueva orden
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extraemos el ID del usuario confirmado del middleware.
  const usuario: ObjectId = req.body.usuarioConfirmado._id;
  // Extraemos los datos de la orden del cuerpo de la solicitud.
  const orderData: IOrder = req.body;

  // Creamos un objeto `data` que combina los datos de la orden con el ID del usuario, la fecha de creación y el estado inicial de la orden.
  const data = {
    ...orderData,
    createdAt: new Date(), //fecha de creación a la fecha y hora actuales.
    user: usuario,
    status: "pending",
  };

  const order = new Order(data);
  await order.save();

  res.status(201).json({
    data: order,
  });
};
