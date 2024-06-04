const express = require('express');
const router = express.Router();
const zoneController = require('../controllers/zoneController'); // Adjust the path as necessary

router.post('/zones', zoneController.createZone);
router.get('/zones', zoneController.getZones);
router.get('/zones/:id', zoneController.getZoneById);
router.put('/zones/:id', zoneController.updateZone);
router.delete('/zones/:id', zoneController.deleteZone);

module.exports = router;
