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
    },
    appointedEmployes: [{
        type: ObjectId,
        ref: 'User'
    }],
    price: { type: Number },
    imageUrls: [{ type: String }],
    status: { type: String },
    isDeleted: { type: Boolean },
    measurementDate: {
        type: Date
    },
    ownerId: { type: ObjectId, ref: 'User' },
    updated: { type: Date },
    created: { type: Date },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
});

const Order = model('Order', orderSchema);

module.exports = Order;