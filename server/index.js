// Load dotenv configuration
require('dotenv').config();

// Require any other necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const Track = require('./models/Track');

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Routes
app.use('/api/auth', authRoutes);

// Define port using environment variable or default to 3000
const port = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start listening for requests after successfully connecting to MongoDB
        server.listen(port, () => console.log(`Server running on port ${port}`));
    }).catch(err => console.error('Could not connect to MongoDB', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Example function to emit data to connected clients
    function emitData(data) {
        console.log("Emitting data:", data);  // Log the data being emitted
        io.emit('data', data);
    }

    const changeStream = Track.watch();

    // Listen for change events
    changeStream.on('change', (change) => {
        console.log('Change:', change);
        // Emit the change to connected clients
        emitData(change);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Listen for any custom events from the client
    socket.on('someClientEvent', (data) => {
        console.log('Data received from client:', data);  // Log data received from the client
        // Process the data and optionally emit a response
        emitData(data);  // This line is optional, based on your use case
    });
});
