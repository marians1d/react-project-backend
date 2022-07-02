const orders = require('../services/orders');

async function getAll(req, res) {
    res.json(await orders.getAll())
}

async function getById(req, res) {
    const id = req.params.id;

    const result = await orders.getById(id);

    return res.json(result);
}

async function add(req, res) {
    const { title, description, price, image, type, status } = req.body;

    const result = await orders.add({ title, description, price, image, type, status })

    res.json(result);
}

async function updateById(req, res) {
    const id = req.params.id;

    const { title, description, price, image, type, status } = req.body;

    try {
        const result = await orders.updateById(id, { title, description, price, image, type, status });

        return res.json(result);
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