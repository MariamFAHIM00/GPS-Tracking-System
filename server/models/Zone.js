const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema({
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
}, { _id: false });

const zoneSchema = new mongoose.Schema(
  {
    name: {type: String, unique: true, required: true},
    coordinates: {type: [coordinateSchema], required: true},
  }, 
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Zone', zoneSchema);
