// Import dependencies
require('dotenv').config();
const express = require('express');

// Import routes
const itemsRoute = require('./routes/api/items.route');
const usersRoute = require('./routes/api/users.route');
const authRoute = require('./routes/api/auth.route');

const app = express();
const port = process.env.PORT || 5000;

// Body Parser Middleware
app.use(express.json());

// User Routes
app.use('/api/items', itemsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));
