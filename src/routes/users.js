const router = require('express').Router();
const formidable = require('express-formidable');

const { isAuth, isOwner } = require('../middlewares/guards');
const User = require('../controllers/user');
const { requestHandler } = require('../utils');

router.post('/register', requestHandler(User.register));
router.post('/login', requestHandler(User.login));
router.get('/logout', requestHandler(User.logout));

router.put('/profile', isAuth(), formidable(), requestHandler(User.profileImage));

module.exports = router;