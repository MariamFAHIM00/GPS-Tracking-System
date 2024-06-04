const Vehicle = require('../models/Vehicle'); // Adjust the path as needed

// Create a new vehicle

exports.addVehicle = async (req, res) => {
  try {
    // Extract vehicle data from request body
    const {
      name,
      make,
      model,
      year,
      vin,
      registrationNumber,
      fuelType,
      transmission,
      color,
      seatingCapacity,
      pricePerDay,
      pricePerHour,
      image,
      features,
      responsibleEmployee,
      zone,
    } = req.body;

    // Create a new vehicle instance
    const newVehicle = new Vehicle({
      name,
      make,
      model,
      year,
      vin,
      registrationNumber,
      fuelType,
      transmission,
      color,
      seatingCapacity,
      pricePerDay,
      pricePerHour,
      available: true, // Default to true
      image,
      features,
      responsibleEmployee,
      zone,
    });

    // Save the new vehicle to the database
    await newVehicle.save();

    res.status(201).json({ message: 'Vehicle added succesfully'}); // Respond with the saved vehicle data
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle error if any
  }
}

// Get all vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('responsibleEmployee').populate('zone');
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
      // Fetch all vehicles from the database
      const vehicles = await Vehicle.find();
      
      // Check if there are no vehicles
      if (vehicles.length === 0) {
          return res.status(404).json({ message: "No vehicles found" });
      }

      // If vehicles are found, send them as a response
      res.status(200).json({ vehicles });
  } catch (error) {
      // Handle errors
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Get a vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('responsibleEmployee').populate('zone');
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
