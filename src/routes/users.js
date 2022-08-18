const router = require('express').Router();

const User = require('../controllers/user');
const { requestHandler } = require('../utils');

router.post('/register', requestHandler(User.register));
router.post('/login', requestHandler(User.login));
router.get('/logout', requestHandler(User.logout));

module.exports = router;