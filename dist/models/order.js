"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now, //Fecha del momento en el que se genera la orden
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    items: {
        type: [
            {
                desc: {
                    type: String,
                    required: true,
                },
                id: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
    shippingDetails: {
        name: {
            type: String,
            required: true,
        },
        cellphone: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
