const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  lng: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
}, { _id: false });

const vehicleSchema = new Schema(
  {
    name: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true, unique: true },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
    transmission: { type: String, enum: ['Manual', 'Automatic'], required: true },
    color: { type: String, required: true },
    seatingCapacity: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    pricePerHour: { type: Number, required: true },
    available: { type: Boolean, default: true },
    image: { type: String, required: true },
    features: {
      airConditioning: { type: Boolean, default: false },
      gps: { type: Boolean, default: false },
      bluetooth: { type: Boolean, default: false },
      usbPort: { type: Boolean, default: false },
      sunroof: { type: Boolean, default: false },
    },
    responsibleEmployee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required:true},
    location: { type: locationSchema},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
