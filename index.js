const express = require('express');
const cors = require('cors');

const routes = require('./src/routes');

const config = require('./src/config/config');

require('dotenv').config();

// Connect database
require('./src/config/database');


const app = express();

require('./src/config/express')(app);

app.use(cors({
    origin: config.origin,
    credentials: true
}));
// Connect routes

app.use('/api', routes);


app.use('*', (req, res) => {
    return res.json({
        message: 'An error has ocurred'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Working on port ${port}`));