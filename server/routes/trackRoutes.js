const express = require('express');
const TrackController = require('../controllers/trackController');

const router = express.Router();

// Create a new track
router.post('/tracks', TrackController.createTrack);

// Get all tracks
router.get('/tracks', TrackController.getTracks);

// Get a single track by ID
router.get('/tracks/:id', TrackController.getTrackById);

// Update a track by ID
router.put('/tracks/:id', TrackController.updateTrack);

// Delete a track by ID
router.delete('/tracks/:id', TrackController.deleteTrack);

module.exports = router;
