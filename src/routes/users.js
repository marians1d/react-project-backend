const router = require('express').Router();

const User = require('../controllers/user');

router.post('/register', User.register);

module.exports = router;