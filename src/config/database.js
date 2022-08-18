const mongoose = require('mongoose');
const config = require('./config');

const startDB = async () => {
    try {
        await mongoose.connect(config.dbURL);

        console.log('Connection successful');
    } catch (error) {
        console.log('Database connection Error');
        return process.exit(1);
    }
};

startDB();