import { useState, useEffect } from 'react';
import axios from 'axios';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import '../../../assets/css/map.css';

const LastPosition = () => {
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedVehicleData, setSelectedVehicleData] = useState(null);
    const [mapCenter, setMapCenter] = useState([31.63, -7.99]); // Default center of Marrakech
    const [userAddress, setUserAddress] = useState("");

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

    const getUserAddress = async (latitude, longitude) => {
        let url = `https://api.opencagedata.com/geocode/v1/json?key=fa98266c878d4df7b58f50a02361b10f&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
    
        try {
            const loc = await fetch(url);
            const data = await loc.json();
            if (data.results && data.results[0]) {
                return data.results[0].formatted;
            } else {
                console.error("No results found");
                return "Address not found";
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            return "Error fetching address";
        }
    };

    const handleVehicleSelect = async (vehicleName) => {
        setSelectedVehicle(vehicleName);
        if (vehicleName === "All Cars") {
            setSelectedVehicleData(null);
            setMapCenter([31.63, -7.99]); // Reset to default center
        } else {
            const vehicleData = vehicles.find(vehicle => vehicle.name === vehicleName);
            setSelectedVehicleData(vehicleData);
            if (vehicleData && vehicleData.location) {
                setMapCenter([vehicleData.location.lat, vehicleData.location.lng]);
                const address = await getUserAddress(vehicleData.location.lat, vehicleData.location.lng);
                setUserAddress(address);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name && vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const clusterOptions = {
        iconCreateFunction: function(cluster) {
            return L.divIcon({
                html: `<div style="background-color: red; color: white;">${cluster.getChildCount()}</div>`,
                className: 'custom-cluster-icon'
            });
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center p-4 relative">
            <h1 className="text-center mb-4 text-lg font-bold">Last Position</h1>

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
                    <MarkerClusterGroup options={clusterOptions}>
                        {selectedVehicle === "All Cars" && filteredVehicles.map((vehicle) => (
                            vehicle.location && <Marker key={vehicle._id} position={[vehicle.location.lat, vehicle.location.lng]}>
                                <Popup>
                                    <div>
                                        <h2>{vehicle.name}</h2>
                                        <p>{vehicle.location.lat}, {vehicle.location.lng}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        {selectedVehicleData && selectedVehicleData.location && (
                            <Marker position={[selectedVehicleData.location.lat, selectedVehicleData.location.lng]}>
                                <Popup>
                                    <div>
                                        <h2>{selectedVehicleData.name}</h2>
                                        <p>{userAddress}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </div>
    );
};

export default LastPosition;
