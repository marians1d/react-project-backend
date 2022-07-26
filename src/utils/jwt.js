const jwt = require('jsonwebtoken');

const secret = process.env.JWT_secret || 'fa;sjdfioeuirjfioewureio;ruewirj';

function createToken(data) {
    return jwt.sign(data, secret, { expiresIn: '1d' });
}

module.exports = {
    createToken
};