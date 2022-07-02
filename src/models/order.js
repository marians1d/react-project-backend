const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    type: String,
    status: String,
})

const Order = model('Order', orderSchema);

module.exports = Order;