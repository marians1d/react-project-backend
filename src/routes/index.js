const router = require('express').Router();

const user = require('./users');
const gallery = require('./gallery');
const orders = require('./orders');

router.use('/users', user);
router.use('/gallery', gallery);
router.use('/orders', orders);

module.exports = router;