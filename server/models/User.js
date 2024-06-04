const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
        phone: {type: String, required: true},
        city: {type: String, required: true},
        password: { type: String, required: true },
        isVerified: {type: Boolean, default: false },
        role: {type: String, enum: ['client', 'employee', 'admin',], default: 'client'},
        emailToken: {type: String}
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('User', userSchema);