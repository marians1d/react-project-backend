const express = require('express');
require('dotenv').config();

// Connect database
require('./src/config/database');


const app = express();

require('./src/config/express')(app);

const routes = require('./src/routes');

// Connect routes
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Working on port ${port}`));