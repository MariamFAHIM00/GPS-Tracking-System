const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema({
    lat: { type: Number},
    lng: { type: Number}
}, { _id: false });

const pathSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    start: { type: coordinateSchema},
    end: { type: coordinateSchema},
    intermediate: { type: [coordinateSchema], default: [] }
}, { _id: false });

const trackSchema = new mongoose.Schema(
    {
        vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
        paths: { type: [pathSchema], required: true }
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Track', trackSchema);
