const mongoose = require('mongoose');
const Track = require('../models/Track');
const Vehicle = require('../models/Vehicle');

async function getRandomVehicleId() {
    const count = await Vehicle.countDocuments();
    const random = Math.floor(Math.random() * count);
    const vehicle = await Vehicle.findOne().skip(random).exec();
    return vehicle._id;
}

const TrackController = {
    createTrack: async (req, res) => {
        try {
            const { paths } = req.body;

            const formattedPaths = await Promise.all(paths.map(async (path) => {
                const start = { lat: path[0].latitude, lng: path[0].longitude };
                const end = { lat: path[path.length - 1].latitude, lng: path[path.length - 1].longitude };
                const intermediate = path.slice(1, -1).map(point => ({
                    lat: point.latitude,
                    lng: point.longitude
                }));

                const vehicleId = await getRandomVehicleId();

                // Create and save the new track with the path for the current vehicle
                const newTrack = new Track({
                    vehicleId: vehicleId,
                    paths: [{ start, end, intermediate }]
                });

                await newTrack.save();

                // Update the vehicle's location to the end coordinate of the current path
                await Vehicle.findByIdAndUpdate(vehicleId, {
                    location: {
                        lat: end.lat,
                        lng: end.lng
                    }
                });

                return newTrack;
            }));

            res.status(201).json(formattedPaths);
        } catch (error) {
            res.status(500).json({ error: 'Error creating tracks' });
        }
    },

    getTracks: async (req, res) => {
        try {
            const tracks = await Track.find().populate('vehicleId');
            res.status(200).json(tracks);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching tracks' });
        }
    },

    getTrackById: async (req, res) => {
        try {
            const { id } = req.params;
            const track = await Track.findById(id).populate('vehicleId');
            if (!track) {
                return res.status(404).json({ error: 'Track not found' });
            }
            res.status(200).json(track);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching track' });
        }
    },

    updateTrack: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedTrack = await Track.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedTrack) {
                return res.status(404).json({ error: 'Track not found' });
            }
            res.status(200).json(updatedTrack);
        } catch (error) {
            res.status(500).json({ error: 'Error updating track' });
        }
    },

    deleteTrack: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedTrack = await Track.findByIdAndDelete(id);
            if (!deletedTrack) {
                return res.status(404).json({ error: 'Track not found' });
            }
            res.status(200).json({ message: 'Track deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting track' });
        }
    }
};

module.exports = TrackController;
