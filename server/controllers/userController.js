const User = require('../models/User'); // Adjust the path to your User model
const bcrypt = require('bcryptjs');
const { sendEmployeeInfos } = require('../utils/sendEmployeeInfos');

const addEmployee = async (req, res) => {
    const { firstName, lastName, email, phone, city, password} = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user instance
        user = new User({
            firstName,
            lastName,
            email,
            phone,
            city,
            password,
            role: 'employee',
            isVerified: true,
            emailToken: null
        });

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        sendEmployeeInfos({
            firstName,
            email,
            password // Pass the original plain password here
        });
        // Respond with the token and user info
        res.status(201).json({ message: 'Employee added succesfully' });
    } catch (error) {
        console.error('Error adding employee:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

async function getEmployees(req, res) {
    try {
        const employees = await User.find({ role: 'employee' });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getClientCount(req, res) {
    try {
        const clientCount = await User.countDocuments({ role: 'client' });
        res.json({ count: clientCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEmployee = async (req, res) => {
    const { firstName, lastName, email, phone, city, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user information
        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;
        user.city = city;

        // If password is provided, hash and update password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save the updated user to the database
        await user.save();

        sendEmployeeInfos({
            firstName,
            email,
            password // Pass the original plain password here
        });

        // Respond with success message
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error('Error updating employee:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await User.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        return res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({ error: 'An error occurred while deleting the employee' });
    }
};

module.exports = {getEmployees, getClientCount, addEmployee, updateEmployee, deleteEmployee};
