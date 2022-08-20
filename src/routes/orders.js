const router = require('express').Router();
const formidable = require('express-formidable');

const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/order');

const { requestHandler } = require('../utils');

const orders = require('../controllers/orders');

router.get('/', requestHandler(orders.getAll));
router.get('/personal', isAuth(), requestHandler(orders.getPersonal));
router.post('/', isAuth(), requestHandler(orders.add));
router.post('/image', isAuth(), formidable(), requestHandler(orders.addImage));
router.get('/:id', requestHandler(orders.getById));
router.put('/:id', preload(api), isOwner(), requestHandler(orders.updateById));
router.delete('/:id', isAuth(), preload(api), isOwner(), requestHandler(orders.del));

module.exports = router;