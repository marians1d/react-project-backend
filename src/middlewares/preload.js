module.exports = (api) => async (req, res, next) => {
    const id = req.params.id;

    const order = await api.getById(id);
    if (order) {
        res.locals.order = order;
        next();
    } else {
        res.status(404).json({ message: `Order ${id} not found` });
    }
};