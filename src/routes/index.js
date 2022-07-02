const user = require('./users');
const gallery = require('./galery');
const orders = require('./orders');

module.exports = app => {
    app.use('/users', user);
    app.use('/gallery', gallery);
    app.use('/orders', orders);
}