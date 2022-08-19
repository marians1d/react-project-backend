const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS || 'mongodb://localhost:27017/custom-furniture',
        origin: ['http://127.0.0.1:5500', 'http://localhost:3030', 'http://localhost:3000']
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: ['http://localhost:3000', 'https://dream-style.web.app']
    }
};

module.exports = config[env];