const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const { sendVerificationMail } = require('../utils/sendVerificationMail');

const createToken = (user) => {
    const payload = {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    };
    return jwt.sign(payload, process.env.SECRET_KEY , { expiresIn: '3d' });
}

const register = async (req, res) => {  
    const { username, email, password } = req.body;

    // Check if required fields are present
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'Missing required fields: email, username, password' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            emailToken: crypto.randomBytes(64).toString("hex") 
        });
        await user.save();

        sendVerificationMail(user);

        res.status(201).json({ message: 'Registration successful! Please check your email for verification instructions.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the user's email is verified
        if (!user.isVerified) {
            return res.status(401).json({ error: 'Email not verified' });
        }

        const token = createToken(user);
        
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const emailToken = req.params.emailToken;

        if (!emailToken) {
            return res.status(404).json('EmailToken not found...');
        }

        const user = await User.findOne({ emailToken });

        if (user) {
            user.emailToken = null;
            user.isVerified = true;
            await user.save();

            try {
                console.log(1);
                const token = createToken(user);
                res.json({ token });
            } catch (tokenError) {
                console.log(0);
                // Handle error in createToken function
                return res.status(500).json({ error: tokenError.message });
            }
        } else {
            return res.status(404).json('Email verification failed, invalid token!');
        }
    } catch (err) {
        // Handle other errors
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {register, login, verifyEmail};