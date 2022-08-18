const { jwt } = require('../utils');

const blacklist = new Set();

function validateToken(token) {
    if (blacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }
    return jwt.verify(token);
}

function logout(token) {
    blacklist.add(token);
}

module.exports = {
    validateToken,
    logout
};