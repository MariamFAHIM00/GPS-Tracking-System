const Zone = require('../models/Zone'); // Adjust the path as necessary

// Create a new zone
exports.createZone = async (req, res) => {
  try {
    const { name, coordinates } = req.body;
    const newZone = new Zone({ name, coordinates });
    await newZone.save();
    res.status(201).json(newZone);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Zone name must be unique' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all zones
exports.getZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single zone by ID
exports.getZoneById = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.status(200).json(zone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a zone by ID
exports.updateZone = async (req, res) => {
  try {
    const { name, coordinates } = req.body;
    const updatedZone = await Zone.findByIdAndUpdate(
      req.params.id,
      { name, coordinates },
      { new: true, runValidators: true }
    );
    if (!updatedZone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.status(200).json(updatedZone);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Zone name must be unique' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete a zone by ID
exports.deleteZone = async (req, res) => {
  try {
    const deletedZone = await Zone.findByIdAndDelete(req.params.id);
    if (!deletedZone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.status(200).json({ message: 'Zone deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
