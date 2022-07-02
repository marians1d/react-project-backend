const router = require('express').Router();

const orders = require('../controllers/orders');

router.get('/', orders.getAll);
router.post('/', orders.add);
router.get('/:id', orders.getById);
router.put('/:id', orders.updateById);

module.exports = router;