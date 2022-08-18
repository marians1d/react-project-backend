const router = require('express').Router();

const user = require('./users');
const gallery = require('./gallery');
const orders = require('./orders');
const comments = require('./comments');

router.use('/users', user);
router.use('/gallery', gallery);
router.use('/orders', orders);
router.use('/comments', comments);

module.exports = router;
