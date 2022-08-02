const { Order } = require('../models');
const { ApiError } = require('../utils');

async function getAll(req, res) {
    const orders = await Order.find({});

    res.json(orders);
}

async function getById(req, res) {
    const id = req.params.id;

    const order = await Order.findById(id);

    return res.json(order);
}

async function add(req, res) {
    const { title, description, price, image, type, status } = req.body;

    const result = new Order({
        title,
        description,
        price,
        image,
        type,
        status
    });

    await result.save();

    res.json(result);
}

async function updateById(req, res) {
    const id = req.params.id;

    const { title, description, price, image, type, status } = req.body;

    const existing = await Order.findById(id);

    if (!existing) {
        throw new ApiError('ORDER_NOT_FOUND');
    }

    existing.title = title;
    existing.description = description;
    existing.price = price;
    existing.image = image;
    existing.type = type;
    existing.status = status;

    await existing.save();

    return res.json(existing);
}

async function del(req, res) {

}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    del
};