const { faker } = require('@faker-js/faker');
const Order = require('../models/Order'); 
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');

const getRandomClient = async () => {
    try {
        const clientUsers = await User.find({ role: 'client' }, '_id'); // Fetching only the _id field of client users
        return clientUsers.map(user => user._id); // Extracting IDs from the fetched client users
    } catch (error) {
        console.error('Error fetching client user IDs:', error);
        return [];
    }
};

// Function to fetch all vehicle IDs from the database
async function getAllVehicleIds() {
    try {
        const vehicles = await Vehicle.find({}, '_id'); // Fetching only the _id field of all vehicles
        return vehicles.map(vehicle => vehicle._id); // Extracting IDs from the fetched vehicles
    } catch (error) {
        console.error('Error fetching vehicle IDs:', error);
        return [];
    }
}

// Function to generate fake orders
async function generateFakeOrders() {
    try {
        const vehicleIds = await getAllVehicleIds();
        const clientIds = await getRandomClient();
        if (vehicleIds.length === 0 || clientIds.length === 0) {
            console.error('No vehicles or client users found in the database.');
            return;
        }

        const startDate = new Date();
        const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

        const orders = [];
        for (let i = 0; i < 10; i++) {
            const rentalStartDate = faker.date.between({ from: startDate, to: endDate }); // Random start date within a year from now
            const maxEndDate = new Date(rentalStartDate.getTime() + 365 * 24 * 60 * 60 * 1000); // Assuming maximum rental period of 1 year
            const rentalEndDate = faker.date.between({ from: rentalStartDate, to: maxEndDate });  // Random end date within a year from rentalStartDate
        
            const order = new Order({
                client: clientIds[Math.floor(Math.random() * clientIds.length)], // Generating a random ObjectId for the client
                car: vehicleIds[Math.floor(Math.random() * vehicleIds.length)], // Generating a random ObjectId for the car
                rentalStartDate: rentalStartDate,
                rentalEndDate: rentalEndDate,
                totalPrice: faker.number.int({ min: 50, max: 1000 }), // Random total price
                status: "Completed"
            });
            orders.push(order);
        }
        await Order.insertMany(orders);
        console.log("10 fake orders generated successfully.");
    } catch (error) {
        console.error('Error generating fake orders:', error);
    }
}

module.exports = {generateFakeOrders};