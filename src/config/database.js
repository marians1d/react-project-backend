const mongoose = require('mongoose');

const startDB = async () => {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URL}/custom-furniture`);

        console.log('Connection successfull');
    } catch (error) {
        console.log('Database connection Error');
    }
};

startDB();