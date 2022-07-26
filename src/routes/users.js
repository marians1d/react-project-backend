const router = require('express').Router();

const User = require('../controllers/user');
const { requestHandler } = require('../utils');

router.post('/register', requestHandler(User.register));

module.exports = router;