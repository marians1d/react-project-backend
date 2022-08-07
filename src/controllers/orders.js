const validator = require('validator');

const { Order } = require('../models');
const { ApiError, formatJSON } = require('../utils');

async function getAll(req, res) {
    const orders = await Order.find({ status: 'active' });

    res.json(orders);
}

async function getById(req, res) {
    const id = req.params.id;

    const order = await Order.findOne({ _id: id, status: 'active' });

    if (!order._id) {
        throw new ApiError('ORDER_NOT_FOUND', 404);
    }

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

    if (!['private', 'public'].includes(visibility)) {
        throw new ApiError('INVALID_VISIBILITY', 401);
    }

    const result = new Order({
        title,
        description,
        address,
        imageUrl,
        visibility,
        ownerId: req.user._id,
        status: 'active',
        created: new Date()
    });

    await result.save();

    const response = formatJSON(result, '_id title description address imageUrl visibility ownerId created');

    res.json(response);
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

    if (!validAddress) {
        throw new ApiError('INVALID_ADDRESS', 401);
    }

    const existing = await Order.findById(id);

    if (!existing) {
        throw new ApiError('ORDER_NOT_FOUND');
    }

    existing.title = title;
    existing.description = description;
    existing.address = address;
    existing.imageUrl = imageUrl;
    existing.visibility = visibility;
    existing.updated = new Date();

    await existing.save();

    return res.json(existing);
}

async function del(req, res) {
    const id = req.params.id;

    const existing = await Order.findById(id);

    existing.status = 'deleted';

    await existing.save();

    res.status(204).end();
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    del
};