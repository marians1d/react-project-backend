const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_secret || 'fa;sjdfioeuirjfioewureio;ruewirj';

function createToken(data) {
    return jwt.sign(data, JWT_SECRET, { expiresIn: '1d' });
}

const verify = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
    createToken,
    verify
};