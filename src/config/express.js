const express = require('express');
const cookieParser = require('cookie-parser');

const cookieSecret = process.env.COOKIESECRET || 'Fear is the mind killer';

module.exports = (app) => {
    app.use(express.json());

    app.use(cookieParser(cookieSecret));
};