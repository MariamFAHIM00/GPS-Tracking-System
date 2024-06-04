const mongoose = require('mongoose');
const Track = require('../models/Track');
const Vehicle = require('../models/Vehicle');

const addPathAndUpdateForVehicle = async (vehicleId) => {
    const trackPoints = [
        {"lat": 31.66096, "lon": -8.01162},
        {"lat": 31.66072, "lon": -8.0113},
        {"lat": 31.66064, "lon": -8.0112},
        {"lat": 31.66064, "lon": -8.01116},
        {"lat": 31.66065, "lon": -8.01113},
        {"lat": 31.66067, "lon": -8.01109},
        {"lat": 31.66089, "lon": -8.01088},
        {"lat": 31.66089, "lon": -8.01088}
    ];

    // Convert the flat list of track points into paths
    const paths = [];
    for (let i = 0; i < trackPoints.length - 1; i++) {
        const start = trackPoints[i];
        const end = trackPoints[i + 1];

        paths.push({
            start: { lat: start.lat, lng: start.lon },
            end: { lat: end.lat, lng: end.lon },
            intermediate: []
        });
    }

    const trackData = {
        vehicleId: mongoose.Types.ObjectId(vehicleId),
        paths: paths
    };

    try {
        // Check if a track already exists for the vehicle
        let track = await Track.findOne({ vehicleId });

        if (track) {
            // Add the new path to the existing track's paths array
            track.paths = track.paths.concat(paths);
            await track.save();
        } else {
            // Create and save the new track with the path for the current vehicle
            const newTrack = new Track(trackData);
            await newTrack.save();
        }

        // Update the vehicle's location to the end coordinate of the last path
        const lastTrackPoint = trackPoints[trackPoints.length - 1];
        await Vehicle.findByIdAndUpdate(vehicleId, {
            location: {
                lat: lastTrackPoint.lat,
                lng: lastTrackPoint.lon
            }
        });

        console.log("Track saved successfully");
    } catch (error) {
        console.error("Error saving track:", error);
    }
};


const addPathAndUpdateForVehicleWithTime = async (vehicleId) => {
    const trackPoints = [
        {"lat": 31.66958, "lon": -8.02478},
        {"lat": 31.66953, "lon": -8.02454},
        {"lat": 31.66953, "lon": -8.02454},
        {"lat": 31.66983, "lon": -8.02441},
        {"lat": 31.66991, "lon": -8.02441},
        {"lat": 31.66997, "lon": -8.02444},
        {"lat": 31.66999, "lon": -8.02447},
        {"lat": 31.66999, "lon": -8.02447}
    ];

    try {
        let track = await Track.findOne({ vehicleId });

        if (!track) {
            track = new Track({ vehicleId, paths: [] });
        }

        // Add the start point
        const start = trackPoints[0];
        const path = {
            start: { lat: start.lat, lng: start.lon },
            end: {},
            intermediate: []
        };
        track.paths.push(path);
        await track.save();

        // Update the intermediate points and the end point
        for (let i = 1; i < trackPoints.length - 1; i++) {
            const current = trackPoints[i];
            
            // Add intermediate point
            track.paths[track.paths.length - 1].intermediate.push({ lat: current.lat, lng: current.lon });
            await track.save();

            // Wait for 5 seconds before processing the next track point
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        // Add the end point
        const lastTrackPoint = trackPoints[trackPoints.length - 1];
        track.paths[track.paths.length - 1].end = { lat: lastTrackPoint.lat, lng: lastTrackPoint.lon };
        await track.save();

        // Update the vehicle's location to the end coordinate of the last track point
        await Vehicle.findByIdAndUpdate(vehicleId, {
            location: {
                lat: lastTrackPoint.lat,
                lng: lastTrackPoint.lon
            }
        });

        console.log("Track saved successfully");
    } catch (error) {
        console.error("Error saving track:", error);
    }
};
const addPathAndUpdateForVehicleWithTime2 = async (vehicleId) => {
    const trackPoints = [
        {"lat": 31.67087, "lon": -8.02595},
        {"lat": 31.67086, "lon": -8.02582},
        {"lat": 31.67087, "lon": -8.02576},
        {"lat": 31.67089, "lon": -8.02567},
        {"lat": 31.67095, "lon": -8.02552},
        {"lat": 31.67101, "lon": -8.02538},
        {"lat": 31.67107, "lon": -8.02528},
        {"lat": 31.67114, "lon": -8.02521},
        {"lat": 31.67121, "lon": -8.02516},
        {"lat": 31.67128, "lon": -8.02512},
        {"lat": 31.67153, "lon": -8.02503},
        {"lat": 31.67158, "lon": -8.02502},
        {"lat": 31.67163, "lon": -8.025},
        {"lat": 31.67163, "lon": -8.025},
        {"lat": 31.67172, "lon": -8.0255},
        {"lat": 31.67172, "lon": -8.0255},
        {"lat": 31.67164, "lon": -8.02552},
        {"lat": 31.67164, "lon": -8.02552},
        {"lat": 31.67162, "lon": -8.02543},
        {"lat": 31.67162, "lon": -8.02543}
    ];

    try {
        let track = await Track.findOne({ vehicleId });

        if (!track) {
            track = new Track({ vehicleId, paths: [] });
        }

        // Add the start point
        const start = trackPoints[0];
        const path = {
            start: { lat: start.lat, lng: start.lon },
            end: {},
            intermediate: []
        };
        track.paths.push(path);
        await track.save();

        // Update the intermediate points and the end point
        for (let i = 1; i < trackPoints.length - 1; i++) {
            const current = trackPoints[i];
            
            // Add intermediate point
            track.paths[track.paths.length - 1].intermediate.push({ lat: current.lat, lng: current.lon });
            await track.save();

            // Wait for 5 seconds before processing the next track point
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        // Add the end point
        const lastTrackPoint = trackPoints[trackPoints.length - 1];
        track.paths[track.paths.length - 1].end = { lat: lastTrackPoint.lat, lng: lastTrackPoint.lon };
        await track.save();

        // Update the vehicle's location to the end coordinate of the last track point
        await Vehicle.findByIdAndUpdate(vehicleId, {
            location: {
                lat: lastTrackPoint.lat,
                lng: lastTrackPoint.lon
            }
        });

        console.log("Track saved successfully");
    } catch (error) {
        console.error("Error saving track:", error);
    }
};

module.exports = addPathAndUpdateForVehicleWithTime;


async function getRandomVehicleId() {
    const count = await Vehicle.countDocuments();
    const random = Math.floor(Math.random() * count);
    const vehicle = await Vehicle.findOne().skip(random).exec();
    return vehicle._id;
}

async function addPathsAndUpdateVehicles() {
    // Define an array of paths
    const paths = [
        // [
        //     {latitude: 31.62897, longitude: -8.06346},
        //     {latitude: 31.62904, longitude: -8.06345},
        //     {latitude: 31.62936, longitude: -8.06344},
        //     {latitude: 31.62936, longitude: -8.06344},
        //     {latitude: 31.62937, longitude: -8.06376},
        //     {latitude: 31.62937, longitude: -8.06419},
        //     {latitude: 31.62938, longitude: -8.06431},
        //     {latitude: 31.62938, longitude: -8.06431},
        //     {latitude: 31.62964, longitude: -8.06431},
        //     {latitude: 31.62964, longitude: -8.06431}
        // ],
        // [
        //     {latitude: 31.62937, longitude: -8.0667},
        //     {latitude: 31.62942, longitude: -8.06669},
        //     {latitude: 31.62942, longitude: -8.06669},
        //     {latitude: 31.62941, longitude: -8.06681},
        //     {latitude: 31.62941, longitude: -8.06722},
        //     {latitude: 31.62941, longitude: -8.06726},
        //     {latitude: 31.6294, longitude: -8.06733},
        //     {latitude: 31.62938, longitude: -8.06735},
        //     {latitude: 31.62935, longitude: -8.06737},
        //     {latitude: 31.62927, longitude: -8.06747},
        //     {latitude: 31.62907, longitude: -8.06768},
        //     {latitude: 31.62895, longitude: -8.06783},
        //     {latitude: 31.62886, longitude: -8.06795},
        //     {latitude: 31.62881, longitude: -8.06803},
        //     {latitude: 31.62881, longitude: -8.06803},
        //     {latitude: 31.62871, longitude: -8.06796},
        //     {latitude: 31.62857, longitude: -8.06783},
        //     {latitude: 31.62853, longitude: -8.06778},
        //     {latitude: 31.62851, longitude: -8.06774},
        //     {latitude: 31.62851, longitude: -8.06771},
        //     {latitude: 31.6285, longitude: -8.06768},
        //     {latitude: 31.62847, longitude: -8.06686},
        //     {latitude: 31.62847, longitude: -8.06671},
        //     {latitude: 31.62847, longitude: -8.06671},
        //     {latitude: 31.62844, longitude: -8.06671},
        //     {latitude: 31.62844, longitude: -8.06671}
        // ]
    ];
    try {
        for (const path of paths) {
            const start = { lat: path[0].latitude, lng: path[0].longitude };
            const end = { lat: path[path.length - 1].latitude, lng: path[path.length - 1].longitude };
            const intermediate = path.slice(1, -1).map(point => ({
                lat: point.latitude,
                lng: point.longitude
            }));

            const vehicleId = await getRandomVehicleId(); // Add await to get the vehicle ID correctly

            // Check if a track already exists for the vehicle
            let track = await Track.findOne({ vehicleId });

            if (track) {
                // Add the new path to the existing track's paths array
                track.paths.push({ start, end, intermediate });
                await track.save();
            } else {
                // Create and save the new track with the path for the current vehicle
                track = new Track({
                    vehicleId: vehicleId,
                    paths: [{ start, end, intermediate }]
                });
                await track.save();
            }

            // Update the vehicle's location to the end coordinate of the current path
            await Vehicle.findByIdAndUpdate(vehicleId, {
                location: {
                    lat: end.lat,
                    lng: end.lng
                }
            });

            console.log(`Path added and vehicle ${vehicleId} location updated successfully.`);
        }
    } catch (error) {
        console.error('Error adding paths and updating vehicle locations:', error);
    }
}

async function addPathsAndUpdateVehiclesWithTime() {
    // Define an array of paths
    const paths = [
        // [
        //     {latitude: 31.62897, longitude: -8.06346},
        //     {latitude: 31.62904, longitude: -8.06345},
        //     {latitude: 31.62936, longitude: -8.06344},
        //     {latitude: 31.62936, longitude: -8.06344},
        //     {latitude: 31.62937, longitude: -8.06376},
        //     {latitude: 31.62937, longitude: -8.06419},
        //     {latitude: 31.62938, longitude: -8.06431},
        //     {latitude: 31.62938, longitude: -8.06431},
        //     {latitude: 31.62964, longitude: -8.06431},
        //     {latitude: 31.62964, longitude: -8.06431}
        // ],
        // [
        //     {latitude: 31.62937, longitude: -8.0667},
        //     {latitude: 31.62942, longitude: -8.06669},
        //     {latitude: 31.62942, longitude: -8.06669},
        //     {latitude: 31.62941, longitude: -8.06681},
        //     {latitude: 31.62941, longitude: -8.06722},
        //     {latitude: 31.62941, longitude: -8.06726},
        //     {latitude: 31.6294, longitude: -8.06733},
        //     {latitude: 31.62938, longitude: -8.06735},
        //     {latitude: 31.62935, longitude: -8.06737},
        //     {latitude: 31.62927, longitude: -8.06747},
        //     {latitude: 31.62907, longitude: -8.06768},
        //     {latitude: 31.62895, longitude: -8.06783},
        //     {latitude: 31.62886, longitude: -8.06795},
        //     {latitude: 31.62881, longitude: -8.06803},
        //     {latitude: 31.62881, longitude: -8.06803},
        //     {latitude: 31.62871, longitude: -8.06796},
        //     {latitude: 31.62857, longitude: -8.06783},
        //     {latitude: 31.62853, longitude: -8.06778},
        //     {latitude: 31.62851, longitude: -8.06774},
        //     {latitude: 31.62851, longitude: -8.06771},
        //     {latitude: 31.6285, longitude: -8.06768},
        //     {latitude: 31.62847, longitude: -8.06686},
        //     {latitude: 31.62847, longitude: -8.06671},
        //     {latitude: 31.62847, longitude: -8.06671},
        //     {latitude: 31.62844, longitude: -8.06671},
        //     {latitude: 31.62844, longitude: -8.06671}
        // ]
    ];
    try {
        for (const path of paths) {
            // Add start of the track
            const start = { lat: path[0].latitude, lng: path[0].longitude };
            const vehicleId = await getRandomVehicleId(); // Add await to get the vehicle ID correctly

            // Check if a track already exists for the vehicle
            let track = await Track.findOne({ vehicleId });

            if (!track) {
                // Create and save the new track with the path for the current vehicle
                track = new Track({
                    vehicleId: vehicleId,
                    paths: [{ start }]
                });
            }

            // Add intermediate points with 5-second delay
            for(let i = 1; i < path.length - 1; i++){
                const intermediate = { lat: path[i].latitude, lng: path[i].longitude };
                track.paths.push({ intermediate });
                await new Promise(resolve => setTimeout(resolve, 5000));
            }

            // Add end of the track
            const end = { lat: path[path.length - 1].latitude, lng: path[path.length - 1].longitude };
            track.paths.push({ end });

            // Save the track
            await track.save();

            // Update the vehicle's location to the end coordinate of the current path
            await Vehicle.findByIdAndUpdate(vehicleId, {
                location: {
                    lat: end.lat,
                    lng: end.lng
                }
            });

            console.log(`Path added and vehicle ${vehicleId} location updated successfully.`);
        }
    } catch (error) {
        console.error('Error adding paths and updating vehicle locations:', error);
    }
}

module.exports = {
    addPathAndUpdateForVehicle, 
    addPathAndUpdateForVehicleWithTime, 
    addPathAndUpdateForVehicleWithTime2, 
    addPathsAndUpdateVehicles, 
    addPathsAndUpdateVehiclesWithTime
};