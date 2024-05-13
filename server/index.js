// Load dotenv configuration
require('dotenv').config();

// Require any other necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Define port using environment variable or default to 3000
const port = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB')
        // Start listening for requests after successfully connecting to MongoDB
        app.listen(port, () => console.log(`Server running on port ${port}`));
    }).catch(err => console.error('Could not connect to MongoDB', err));

