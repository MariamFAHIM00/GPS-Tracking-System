const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(
    {
        vehicleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true},
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
        bearing: {type: Number, required: true}
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Track', trackSchema);



