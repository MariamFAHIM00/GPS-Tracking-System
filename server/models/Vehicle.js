const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
    {
        make: { type: String, required: true },
        model: { type: String, required: true},
        year: { type: Number, required: true },
        color: {type: String, required: true },
        image: {type: String, required: true}
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);