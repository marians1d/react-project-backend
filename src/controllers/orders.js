const validator = require('validator');

const { Order, User } = require('../models');
const { ApiError, formatJSON } = require('../utils');
const { uploadFile } = require('../utils/drive');

async function getAll(req, res) {
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 5;
    const sort = req?.query?.sort;
    const order = req?.query?.order;
    const search = req?.query?.search;
    const criteria = (req?.query?.criteria || '').trim();
    const skipIndex = (page - 1) * limit;

    const query = { isDeleted: false, $or: [ { visibility: 'public' }, { ownerId: req.user?._id } ] };
    const sortCriteria = {};

    if (sort && sort !== 'null' && order && order !== 'null') {
        sortCriteria[sort] = order;
    }

    if (search && search !== 'null' && criteria && criteria !== 'null') {
        query[criteria] = criteria == '_id' ? search : new RegExp(search, 'i');
    }

    const count = await Order.countDocuments(query);

    const orders = await Order
        .find(query)
        .limit(limit)
        .skip(skipIndex)
        .sort(sortCriteria)
        .populate('ownerId')
        .lean();

    res.json({ count, orders });
}

async function getPersonal(req, res) {
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 5;
    const sort = req?.query?.sort;
    const order = req?.query?.order;
    const search = req?.query?.search;
    const criteria = (req?.query?.criteria || '').trim();
    const skipIndex = (page - 1) * limit;

    const query = { isDeleted: false, ownerId: req.user?._id };
    const sortCriteria = {};

    if (sort && sort !== 'null' && order && order !== 'null') {
        sortCriteria[sort] = order;
    }

    if (search && search !== 'null' && criteria && criteria !== 'null') {
        query[criteria] = criteria == '_id' ? search : new RegExp(search, 'i');
    }

    const count = await Order.countDocuments(query);

    const orders = await Order
        .find(query)
        .limit(limit)
        .skip(skipIndex)
        .sort(sortCriteria)
        .populate('ownerId')
        .lean();

    res.json({ count, orders });
}

async function getById(req, res) {
    const id = req.params.id;

    const order = await Order.findOne({ _id: id, isDeleted: false })
    .populate({
        path: 'comments',
        populate: {
            path: 'userId',
            select: '_id username profileImageUrl'
        }
    })
    .populate('ownerId', '_id username profileImageUrl')
    .lean();

    if (!order._id) {
        throw new ApiError('ORDER_NOT_FOUND', 404);
    }

    return res.json(order);
}

async function add(req, res) {
    const { title, description, address, imageUrls, visibility } = req.body;

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
        imageUrls,
        visibility,
        ownerId: req.user._id,
        status: 'pending',
        isDeleted: false,
        created: new Date()
    });

    await result.save();

    await User.updateOne({ _id: req.user._id}, { $push: { orders: result._id}});

    const response = formatJSON(result, '_id title description address imageUrls visibility ownerId created');

    res.json(response);
}

async function addImage(req, res) {
    const newProfileImage = req.files.orderImage;

    const imageId = await uploadFile(newProfileImage);

    const imageUrl = `https://drive.google.com/uc?id=${imageId}`;

    res.json({imageUrl});
}

async function updateById(req, res) {
    const id = req.params.id;

    const { title, description, address, imageUrls, visibility } = req.body;

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
    existing.imageUrls = imageUrls;
    existing.visibility = visibility;
    existing.updated = new Date();

    await existing.save();

    return res.json(existing);
}

async function del(req, res) {
    const id = req.params.id;

    const existing = await Order.findById(id);

    existing.isDeleted = true;

    await existing.save();

    res.status(204).end();
}

module.exports = {
    getAll,
    getPersonal,
    getById,
    add,
    addImage,
    updateById,
    del
};