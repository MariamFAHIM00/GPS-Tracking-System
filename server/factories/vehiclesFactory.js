const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Vehicle = require('../models/Vehicle');
const Track = require('../models/Track');  

const generateFakeVehicle = () => {
    return {
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.number.int({ min: 1990, max: 2024 }),
        color: faker.vehicle.color(),
        image: faker.image.url()
    };
};

// Generate a specified number of fake vehicles
const generateFakeVehicles = async () => {
    const vehicles = [];
    for (let i = 0; i < 5; i++) {
        vehicles.push(generateFakeVehicle());
    }
    try {
        await Vehicle.insertMany(vehicles);
        console.log("5 fake vehicles generated successfully");
    } catch (err) {
        console.error('Error generating fake vehicles:', err.message);
    }
};


async function generateRandomCoordinate(baseLat, baseLng) {
    const lat = baseLat + (Math.random() - 0.5) * 0.01;
    const lng = baseLng + (Math.random() - 0.5) * 0.01;
    const bearing = (Math.random() - 0.5) * 360;
    return { lat, lng, bearing };
}


async function generateRandomTracks() {
    const baseLat = 32.0;  // Approximate latitude for Morocco
    const baseLng = -6.0;  // Approximate longitude for Morocco

    try {
        const vehicles = await Vehicle.find();
        const numVehicles = vehicles.length;

        let vehicleIndex = 0;

        while (true) {
            let vehicle = vehicles[vehicleIndex];
            let trackCount = 0;

            while (trackCount < 15) {
                const track = await generateRandomCoordinate(baseLat, baseLng);
                const trackData = await Track.create({
                    vehicleId: vehicle._id,
                    lat: track.lat,
                    lng: track.lng,
                    bearing: track.bearing,
                    timestamp: new Date()
                });

                console.log(`Inserted track for vehicle ${vehicle._id}`);
                trackCount++;

                

                await new Promise(resolve => setTimeout(resolve, 5000));  // Wait for 5 seconds
            }

            vehicleIndex = (vehicleIndex + 1) % numVehicles;

            if (vehicleIndex === 0) {
                console.log('Pausing for 30 minutes...');
                await new Promise(resolve => setTimeout(resolve, 30 * 60 * 1000));  // Pause for 30 minutes
            }
        }
    } catch (error) {
        console.error('Error generating tracks:', error);
    }
}
module.exports = {generateFakeVehicles, generateRandomTracks};