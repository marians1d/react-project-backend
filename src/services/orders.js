const Order = require('../models/order');

async function getAll() {
    return Order.find({});
}

async function getById(id) {
    const order = Order.findById(id);

    return order;
}

async function add(order) {
    const result = new Order({
        title: order.title,
        description: order.description,
        price: order.price,
        image: order.image,
        type: order.type,
        status: order.status,
    });


    await result.save();

    return result;
}

async function updateById(id, item) {
    const existing = await Order.findById(id);

    if (existing) {
        existing.title = item.title;
        existing.description = item.description;
        existing.price = item.price;
        existing.image = item.image;
        existing.type = item.type;
        existing.status = item.status;

        await existing.save();

        return existing
    } else {
        const error = new Error('Not Found');
        error._notFound;

        throw error;
    }
}

module.exports = {
    getAll,
    getById,
    add,
    updateById
}