const Order = require('../models/Order');

async function getById(id) {
    return Order.findById(id);
}

module.exports = {
    getById,
};
