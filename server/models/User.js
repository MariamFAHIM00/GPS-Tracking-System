const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
        password: { type: String, required: true },
        isVerified: {type: Boolean, default: false },
        emailToken: {type: String}
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('User', userSchema);