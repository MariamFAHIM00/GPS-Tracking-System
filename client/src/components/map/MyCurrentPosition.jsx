import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import "leaflet/dist/leaflet.css";
import '../../assets/css/map.css';

const MapWrapper = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [userAddress, setUserAddress] = useState("");
    const [center, setCenter] = useState([51.505, -0.09]); // Default center, can be any coordinates
    const [locationDenied, setLocationDenied] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(userCoords, handleError, {
                enableHighAccuracy: true,
                timeout: 1000,
                maximumAge: 0
            });

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            setCenter([latitude, longitude]);
            getUserAddress(latitude, longitude);
        }
    }, [latitude, longitude]);

    const userCoords = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationDenied(false); // Reset location denied state
    }

    const handleError = (error) => {
        if (error.code === error.PERMISSION_DENIED) {
            setLocationDenied(true);
        }
        console.error("Error fetching geolocation:", error);
    }

    const getUserAddress = async (latitude, longitude) => {
        let url = `https://api.opencagedata.com/geocode/v1/json?key=fa98266c878d4df7b58f50a02361b10f&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;

        try {
            const loc = await fetch(url);
            const data = await loc.json();
            if (data.results && data.results[0]) {
                setUserAddress(data.results[0].formatted);
            } else {
                console.error("No results found");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    }

    const RecenterAutomatically = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(center);
        }, [center, map]);
        return null;
    }

    RecenterAutomatically.propTypes = {
        center: PropTypes.arrayOf(PropTypes.number).isRequired,
    };

    return (
        <div className='w-full sm:w-1/2 relative z-10'>
            {latitude && longitude ? (
                <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="leaflet-map">
                    <RecenterAutomatically center={center} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}>
                        <Popup>
                            {userAddress || "Fetching address...."}
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                locationDenied ? (
                    <p>Please allow location access to use this feature.</p>
                ) : (
                    <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="leaflet-map">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                )
            )}
        </div>
    );
}

export default MapWrapper;
