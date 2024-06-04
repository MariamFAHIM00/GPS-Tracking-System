const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const router = express.Router();

router.post('/vehicles', vehicleController.addVehicle);
router.get('/vehicles', vehicleController.getVehicles);
router.get('/allVehicles', vehicleController.getAllVehicles);
router.get('/vehicles/:id', vehicleController.getVehicleById);
router.put('/vehicles/:id', vehicleController.updateVehicle);
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

module.exports = router;