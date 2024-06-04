// Load dotenv configuration
require('dotenv').config();

// Require any other necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const socketIo = require('socket.io');
const vehicleRoutes = require('./routes/vehicleRoutes');
const zoneRoutes = require('./routes/zoneRoutes');
const trackRoutes = require('./routes/trackRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const tracksFactory = require('./factories/tracksFactory');
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
app.use('/api/', vehicleRoutes);
app.use('/api/', zoneRoutes);
app.use('/api', trackRoutes);
app.use('/api', orderRoutes);
app.use('/api', userRoutes);

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
    
    // Function to emit data to connected clients
    function emitData(data) {
        io.emit('data', data);
    }

    const changeStream = Track.watch();

    // Listen for change events
    changeStream.on('change', async (change) => {
        // Check if it's an update operation
        if (change.operationType === 'update') {
            // Retrieve all details about the updated data
            const updatedData = await Track.findOne({ _id: change.documentKey._id });
            // Emit the updated data to connected clients
            emitData(updatedData);
        } else {
            // For insert operations, emit the change as is
            emitData(change);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Listen for any custom events from the client
    socket.on('someClientEvent', (data) => {
        console.log('Data received from client:', data);
        // Process the data and optionally emit a response
        emitData(data);
    });

    // Execute tracksFactory.addPathAndUpdateForVehicleWithTime after 5 seconds
    setTimeout(() => {
        // tracksFactory.addPathAndUpdateForVehicleWithTime("6652bfbc9e35a159df5fc212");
        // tracksFactory.addPathAndUpdateForVehicleWithTime2("6652bfb04d84488bc8c4d09c");
    }, 5000); // 5000 milliseconds = 5 seconds
});



