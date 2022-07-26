const Order = require('../models/order');

async function getAll(req, res) {
    res.json(await Order.find({}))
}

async function getById(req, res) {
    const id = req.params.id;

    const order = Order.findById(id);

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

    try {
        const existing = await Order.findById(id);

        if (existing) {
            existing.title = title;
            existing.description = description;
            existing.price = price;
            existing.image = image;
            existing.type = type;
            existing.status = status;

            await existing.save();

            return existing
        } else {
            const error = new Error('Not Found');
            error._notFound;

            throw error;
        }

        return res.json(existing);
    } catch (error) {
        if (error._notFound) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            console.error(error);
            res.status(400).json({ message: 'Request error' })
        }
    }
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