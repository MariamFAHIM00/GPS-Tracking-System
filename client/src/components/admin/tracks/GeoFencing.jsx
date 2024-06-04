import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, Polygon, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import '../../../assets/css/map.css';

const ZonesMap = () => {
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedVehicleData, setSelectedVehicleData] = useState(null);
    const [zones, setZones] = useState([]);
    const [mapCenter, setMapCenter] = useState([31.63, -7.99]); // Default center of Marrakech

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/zones');
                setZones(response.data);
            } catch (error) {
                console.error('Error fetching zones:', error);
            }
        };

        fetchZones();
    }, []);

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

    const handleVehicleSelect = (vehicleName) => {
        setSelectedVehicle(vehicleName);
        if (vehicleName === "All Cars") {
            setSelectedVehicleData(null);
            setMapCenter([31.63, -7.99]); // Reset to default center
        } else {
            const vehicleData = vehicles.find(vehicle => vehicle.name === vehicleName);
            setSelectedVehicleData(vehicleData);
            if (vehicleData && vehicleData.location) {
                setMapCenter([vehicleData.location.lat, vehicleData.location.lng]);
            }
        }
    };

    const isPointInPolygon = (point, vs) => {
        const x = point[0], y = point[1];

        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            const xi = vs[i][0], yi = vs[i][1];
            const xj = vs[j][0], yj = vs[j][1];

            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };

    const isVehicleInAnyZone = (vehicle) => {
        const vehicleLocation = vehicle.location ? [vehicle.location.lat, vehicle.location.lng] : [0, 0];
        return zones.some(zone => isPointInPolygon(vehicleLocation, zone.coordinates.map(coord => [coord.lat, coord.lng])));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name && vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center p-4 relative">
            <h1 className="text-center mb-4 text-lg font-bold">Geofencing Cars</h1>

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
                        <DropdownMenuItem className="hover:bg-gray-700 py-2 px-4" onSelect={() => handleVehicleSelect("All Cars")}>
                            All Cars
                        </DropdownMenuItem>
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
                    key={`${mapCenter[0]}-${mapCenter[1]}`} // Add key prop to force re-render
                    center={mapCenter}
                    zoom={10}
                    style={{ height: '500px', width: '100%' }}
                    className="z-10"
                >
                    <TileLayer
                        key={`tilelayer-${mapCenter[0]}-${mapCenter[1]}`} // Add key prop to force tile reload
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {zones.map(zone => (
                        <Polygon
                            key={zone._id}
                            positions={zone.coordinates.map(coord => [coord.lat, coord.lng])}
                            color={"#000000"}
                        >
                            <Popup>{zone.name}</Popup>
                        </Polygon>
                    ))}
                    <MarkerClusterGroup>
                        {selectedVehicle === "All Cars" && filteredVehicles.map((vehicle) => (
                            vehicle.location && <Marker
                                key={vehicle._id}
                                position={[vehicle.location.lat, vehicle.location.lng]}
                                icon={L.divIcon({ className: isVehicleInAnyZone(vehicle) ? 'marker-icon' : 'marker-icon red' })}
                            >
                                <Popup>{vehicle.name}</Popup>
                            </Marker>
                        ))}
                        {selectedVehicleData && selectedVehicleData.location && (
                            <Marker
                                position={[selectedVehicleData.location.lat, selectedVehicleData.location.lng]}
                                icon={L.divIcon({ className: isVehicleInAnyZone(selectedVehicleData) ? 'marker-icon' : 'marker-icon red' })}
                            >
                                <Popup>{selectedVehicleData.name}</Popup>
                            </Marker>
                        )}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </div>
    );
};

export default ZonesMap;
