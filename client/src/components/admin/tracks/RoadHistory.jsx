import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import '../../../assets/css/map.css';
import { io } from 'socket.io-client';

const ZonesMap = () => {
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [vehiclePaths, setVehiclePaths] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true); 
    const [selectedVehicleData, setSelectedVehicleData] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vehicles');
                setVehicles(Array.isArray(response.data) ? response.data : []);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);

    // const getUserAddress = async (latitude, longitude) => {
    //     let url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=665e35a67b1f7498566811tqp66f633`;
    
    //     try {
    //         const loc = await fetch(url);
    //         const data = await loc.json();
    //         if (data.results && data.results[0]) {
    //             return data.results[0].formatted;
    //         } else {
    //             console.error("No results found");
    //             return "Address not found";
    //         }
    //     } catch (error) {
    //         console.error("Error fetching address:", error);
    //         return "Error fetching address";
    //     }
    // };

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tracks');
                const tracksData = response.data;
                
                // Organize tracks by vehicle ID and fetch addresses
                const organizedTracks = await Promise.all(vehicles.map(async vehicle => {
                    const vehicleTrack = tracksData.find(track => track.vehicleId._id === vehicle._id);
                    if (vehicleTrack) {
                        const paths = await Promise.all(vehicleTrack.paths.map(async path => {
                            // const startAddress = await getUserAddress(path.start.lat, path.start.lng);
                            // const endAddress = await getUserAddress(path.end.lat, path.end.lng);
                            return {
                                ...path,
                                // startAddress,
                                // endAddress
                            };
                        }));
                        return {
                            vehicleId: vehicle._id,
                            paths
                        };
                    }
                    return {
                        vehicleId: vehicle._id,
                        paths: []
                    };
                }));

                setVehiclePaths(organizedTracks);

            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };

        if (vehicles.length > 0) {
            fetchTracks();
        }
    }, [vehicles]);

    const handleVehicleSelect = (vehicleName) => {
        setSelectedVehicle(vehicleName);
            const vehicleData = vehicles.find(vehicle => vehicle.name === vehicleName);
            setSelectedVehicleData(vehicleData);
    };

    useEffect(() => {
        const socket = io('http://localhost:5000');
    
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });
    
        socket.on('data', (data) => {
            console.log("🚀 ~ socket.on ~ newPathsData:", data);
            setVehiclePaths(prevPaths => {
                const vehicleId = data.operationType === 'insert' ? data.fullDocument.vehicleId : data.vehicleId;
                const id = data.operationType === 'insert' ? data.fullDocument._id : data._id;
                const { start, intermediate, end } = data.operationType === 'insert' ? data.fullDocument.paths[0] : data.paths[0];
    
                return prevPaths.map(vehicle => {
                    if (vehicle.vehicleId === vehicleId) {
                        const newPath = { ...vehicle };
                        const existingPathIndex = newPath.paths.findIndex(path => path._id === id);
    
                        if (existingPathIndex !== -1) {
                            // Path exists, update it
                            const existingPath = newPath.paths[existingPathIndex];
                            if (start) existingPath.start = start;
                            if (intermediate && intermediate.length > 0) existingPath.intermediate = intermediate;
                            if (end && end.lat && end.lng) existingPath.end = end;
                        } else {
                            // Path doesn't exist, add it
                            newPath.paths.push({ _id: id, start, intermediate, end });
                        }
                        return newPath;
                    }
                    return vehicle;
                });
            });
        });
    
        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });
    
        return () => {
            socket.disconnect();
        };
    }, []);
    
    
    
    
    
    
    
    

    useEffect(() => {
        console.log("🚀 ~ socket.on ~ newPath:",vehiclePaths)
    }, [vehiclePaths]);



    if (loading) {
        return <div>Loading...</div>; 
    }

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name && vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center p-4 relative">
            <h1 className="text-center mb-4 text-lg font-bold">Road History</h1>
            
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="bg-lime-400 text-black py-2 px-4 rounded w-[300px] z-20 relative">
                        {selectedVehicle || "Select Vehicle"}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-lime-400 border border-black rounded mt-2 w-[350px] z-20 relative md:w-[600px] sm:w-[400px]">
                    <div className="flex justify-center mb-1">
                        <Input
                            type="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[280px] text-black mt-2 items-center"
                        />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {filteredVehicles.map((vehicle) => (
                            <DropdownMenuItem
                                key={vehicle._id}
                                className="hover:bg-black py-2 px-4"
                                onSelect={() => handleVehicleSelect(vehicle.name)}
                            >
                                {vehicle.name}
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="mt-4 w-full">
            <MapContainer
                center={[31.63, -7.99]}
                zoom={10}
                style={{ height: '500px', width: '100%' }}
                className="z-10"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {vehiclePaths.map(({ vehicleId, paths }) => (
                    selectedVehicleData && vehicleId === selectedVehicleData._id && paths.map((path, index) => (
                        <React.Fragment key={index}>
                            {path.start && (
                                <Marker
                                    position={[path.start.lat, path.start.lng]}
                                    icon={L.divIcon({ className: 'start-marker' })}
                                >
                                    <Popup>{`Start Address: ${path.startAddress}`}</Popup>
                                </Marker>
                            )}
                            {path.intermediate && path.intermediate.length > 0 && path.intermediate.map((point, i) => (
                                <Marker
                                    key={`intermediate-${i}`}
                                    position={[point.lat, point.lng]}
                                    icon={L.divIcon({ className: 'intermediate-marker' })}
                                />
                            ))}
                            {path.end && (
                                <Marker
                                    position={[path.end.lat, path.end.lng]}
                                    icon={L.divIcon({ className: 'end-marker' })}
                                >
                                    <Popup>{`End Address: ${path.endAddress}`}</Popup>
                                </Marker>
                            )}
                            {path.start && path.end && path.intermediate && path.intermediate.length > 0 && (
                                <Polyline
                                    positions={[
                                        [path.start.lat, path.start.lng],
                                        ...(path.intermediate ? path.intermediate.map(coord => [coord.lat, coord.lng]) : []),
                                        [path.end.lat, path.end.lng]
                                    ]}
                                    color="blue"
                                    weight={5}
                                />
                            )}
                        </React.Fragment>
                    ))
                ))}
            </MapContainer>




            </div>
        </div>
    );
};

export default ZonesMap;
