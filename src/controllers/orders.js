const validator = require('validator');

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
    const { title, description, address, imageUrl, visibility } = req.body;

    const validTitle = validator.default.isLength(title, {
        min: 3
    });

    if (!validTitle) {
        throw new ApiError('INVALID_TITLE', 401);
    }

    const validDescription = validator.default.isLength(description, {
        min: 10
    });

    if (!validDescription) {
        throw new ApiError('INVALID_DESCRIPTION', 401);
    }

    const validAddress = validator.default.isLength(address, {
        min: 5
    });

    if (!validAddress) {
        throw new ApiError('INVALID_ADDRESS', 401);
    }

    const result = new Order({
        title,
        description,
        address,
        imageUrl,
        visibility,
        created: new Date()
    });

    await result.save();

    res.json({

    });
}

async function updateById(req, res) {
    const id = req.params.id;

    const { title, description, address, imageUrl, visibility } = req.body;

    const validTitle = validator.default.isLength(title, {
        min: 3
    });

    if (!validTitle) {
        throw new ApiError('INVALID_TITLE', 401);
    }

    const validDescription = validator.default.isLength(description, {
        min: 10
    });

    if (!validDescription) {
        throw new ApiError('INVALID_DESCRIPTION', 401);
    }

    const validAddress = validator.default.isLength(address, {
        min: 5
    });

    const existing = await Order.findById(id);

    if (!existing) {
        throw new ApiError('ORDER_NOT_FOUND');
    }

    existing.title = title;
    existing.description = description;
    existing.address = address;
    existing.imageUrl = imageUrl;
    existing.visibility = visibility;

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