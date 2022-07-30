const jwt = require('./jwt');
const auth = require('./auth');
const requestHandler = require('./requests');
const ApiError = require('./error');
const validator = require('validator');

const formatJSON = (obj, keys) => {
    const keysArr = keys.split(' ');

    const result = {};
    keysArr.forEach((key) => {
        result[key] = obj[key];
    });

    return result;
};

module.exports = {
    jwt,
    auth,
    requestHandler,
    ApiError,
    formatJSON,
    validator
};
