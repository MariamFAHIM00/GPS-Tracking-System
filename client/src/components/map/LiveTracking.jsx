import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Polyline } from 'react-leaflet';

const MapWithZoneAndPoints = () => {
  const mapRef = useRef(null);
  const [point1, setPoint1] = useState([31.70, -8.10]); // Inside Marrakech zone
  const [point2, setPoint2] = useState([31.75, -8.05]); // Outside Marrakech zone
  const [routePoints, setRoutePoints] = useState([
    [31.70, -8.10], // Starting point
    [31.72, -8.08], // Waypoint
    [31.74, -8.06]  // Ending point
  ]);

  // Define coordinates for Marrakech zone
  const marrakechZone = [
    [31.71643179289622, -8.126642761581508],
    [31.694817496031447, -7.925455646879869],
    [31.566196125450457, -7.891123374746483],
    [31.56795124883488, -8.082010807808107]
  ];

  useEffect(() => {
    // Fit map to bounds when component mounts
    if (mapRef.current && marrakechZone.length > 0) {
      mapRef.current.fitBounds(marrakechZone);
    }
  }, [marrakechZone]);

  // Function to check if a point is inside a polygon
  const isPointInsideZone = (point, polygon) => {
    let x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      let xi = polygon[i][0], yi = polygon[i][1];
      let xj = polygon[j][0], yj = polygon[j][1];
      let intersect = ((yi > y) !== (yj > y)) &&
                       (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  // Function to check if a route is inside the Marrakech zone
  const isRouteInsideZone = (route, polygon) => {
    for (let i = 0; i < route.length; i++) {
      if (!isPointInsideZone(route[i], polygon)) {
        return false;
      }
    }
    return true;
  };

  return (
    <MapContainer
      center={[31.63, -7.99]} // Center of Marrakech
      zoom={10}
      style={{ height: '500px', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Add polygon representing the Marrakech zone */}
      <Polygon pathOptions={{ color: 'purple' }} positions={marrakechZone} />

      {/* Add markers for the two points */}
      <Marker position={point1} icon={isPointInsideZone(point1, marrakechZone) ? greenIcon : redIcon} />
      <Marker position={point2} icon={isPointInsideZone(point2, marrakechZone) ? greenIcon : redIcon} />

      {/* Add route polyline */}
      <Polyline
        positions={routePoints}
        color={isRouteInsideZone(routePoints, marrakechZone) ? 'green' : 'red'}
      />
    </MapContainer>
  );
};

// Define custom marker icons
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default MapWithZoneAndPoints;
