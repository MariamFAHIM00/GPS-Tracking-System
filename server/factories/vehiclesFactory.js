const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const Zone = require('../models/Zone');

// Fetch a random employee
const getRandomEmployee = async () => {
    const employees = await User.find({ role: 'employee' });
    if (employees.length === 0) {
        throw new Error('No employees found. Please create employee users first.');
    }
    return faker.helpers.arrayElement(employees);
};

// Fetch a random zone
const getRandomZone = async () => {
    const zones = await Zone.find({});
    if (zones.length === 0) {
        throw new Error('No zones found. Please create zones first.');
    }
    return faker.helpers.arrayElement(zones);
};

// Generate a fake vehicle
const generateFakeVehicle = async () => {
    const randomEmployee = await getRandomEmployee();
    const randomZone = await getRandomZone();

    return new Vehicle({
        name: faker.vehicle.vehicle(),
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.number.int({ min: 1990, max: 2024 }),
        vin: faker.vehicle.vin(),
        registrationNumber: faker.string.alphanumeric(10),
        fuelType: faker.helpers.arrayElement(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
        transmission: faker.helpers.arrayElement(['Manual', 'Automatic']),
        color: faker.color.human(),
        seatingCapacity: faker.number.int({ min: 2, max: 8 }),
        pricePerDay: faker.number.int({ min: 200, max: 5000 }),
        pricePerHour: faker.number.int({ min: 50, max: 500 }),
        available: faker.datatype.boolean(),
        image: faker.image.url(),
        features: {
            airConditioning: faker.datatype.boolean(),
            gps: faker.datatype.boolean(),
            bluetooth: faker.datatype.boolean(),
            usbPort: faker.datatype.boolean(),
            sunroof: faker.datatype.boolean()
        },
        responsibleEmployee: randomEmployee._id,
        zone: randomZone._id,
        location: {
            lat: faker.location.latitude(),
            lng: faker.location.longitude()
        }
    });
};

// Generate a specified number of fake vehicles
const generateFakeVehicles = async () => {
    const vehicles = [];
    for (let i = 0; i < 2; i++) {
        try {
            const fakeVehicle = await generateFakeVehicle();
            vehicles.push(fakeVehicle);
        } catch (err) {
            console.error('Error generating fake vehicle:', err.message);
        }
    }
    if (vehicles.length > 0) {
        try {
            await Vehicle.insertMany(vehicles);
            console.log(`${vehicles.length} fake vehicle(s) generated successfully`);
        } catch (err) {
            console.error('Error inserting fake vehicles:', err.message);
        }
    }
};

module.exports = { generateFakeVehicles };
