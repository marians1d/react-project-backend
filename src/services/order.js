const { Order } = require('../models');

async function getById(id) {
    return Order.findById(id);
}

module.exports = {
    getById,
};
