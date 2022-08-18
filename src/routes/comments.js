const router = require('express').Router();

const { isAuth } = require('../middlewares/guards');
const { requestHandler } = require('../utils');

const comments = require('../controllers/comments');

router.post('/:orderId', isAuth(), requestHandler(comments.createComment));

module.exports = router;