const { Schema, model, Types: { ObjectId } } = require('mongoose');

const orderSchema = new Schema({
    title: { type: String },
    description: { type: String },
    address: {
        type: String,
    },
    visibility: {
        type: String,
        enum: [
            'private',
            'public'
        ],
        required: true
    },
    appointedEmployes: [{
        type: ObjectId,
        ref: 'User'
    }],
    price: { type: Number },
    imageUrl: { type: String },
    type: { type: String },
    status: { type: String },
    measurementDate: {
        type: Date
    },
    ownerId: { type: ObjectId, ref: 'User' }
});

const Order = model('Order', orderSchema);

module.exports = Order;