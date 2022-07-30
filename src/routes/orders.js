const router = require('express').Router();

const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/order');

const { requestHandler } = require('../utils');

const orders = require('../controllers/orders');

router.get('/', requestHandler(orders.getAll));
router.post('/', isAuth(), requestHandler(orders.add));
router.get('/:id', requestHandler(orders.getById));
router.put('/:id', preload(api), isOwner(), requestHandler(orders.updateById));
router.delete('/:id', isAuth(), isOwner(), requestHandler(orders.updateById));

module.exports = router;