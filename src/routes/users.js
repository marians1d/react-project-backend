const router = require('express').Router();

router.get('/', (req, res) => res.json(['user']))

module.exports = router;