const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const User = require('../models/User'); 

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const createFakeUser = async (role, count) => {
    const hashedPassword = await hashPassword(role); // Using role name as the password for simplicity
    try {
        for (let i = 0; i < count; i++) {
            const user = new User({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                city: faker.location.city(),
                password: hashedPassword,
                isVerified: faker.datatype.boolean(),
                role: role, // Assign role directly as a string
                emailToken: null
            });
            await user.save();
        }
        console.log(`${count} ${role}s created successfully!`);
    } catch (err) {
        console.error(`Error creating ${role}s:`, err);
    }
};

// Function to create fake clients
const createFakeClients = async () => {
    await createFakeUser('client', 10);
};

// Function to create fake employees
const createFakeEmployees = async () => {
    await createFakeUser('employee', 5);
};

module.exports = { createFakeClients, createFakeEmployees };
