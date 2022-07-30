const { Schema, model, Types: { ObjectId } } = require('mongoose');

const orderSchema = new Schema({
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    type: { type: String },
    status: { type: String },
    ownerId: { type: ObjectId, ref: 'User' }
});

const Order = model('Order', orderSchema);

module.exports = Order;