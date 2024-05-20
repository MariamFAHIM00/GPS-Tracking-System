import React, { useEffect } from 'react';
import io from 'socket.io-client';

const LiveTracking = () => {
    useEffect(() => {
        const socket = io('http://localhost:5000'); // Ensure this matches your server's address and port

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('data', (data) => {
            console.log('Data received from server:', data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Live Tracking</h1>
        </div>
    );
};

export default LiveTracking;
