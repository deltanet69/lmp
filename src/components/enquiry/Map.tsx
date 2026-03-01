"use client";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function Map() {
    // Initial coordinates for Bekasi (approximate)
    const position: [number, number] = [-6.1806227, 106.9936612];

    // Clean up map instance on unmount to prevent "Map container is already initialized" errors
    useEffect(() => {
        return () => {
            const container = L.DomUtil.get('map-container');
            if (container != null) {
                // @ts-expect-error
                container._leaflet_id = null;
            }
        }
    }, [])

    return (
        <div className="w-full h-[500px] z-0 relative isolate">
            <MapContainer
                id="map-container"
                center={position}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={icon}>
                    <Popup>
                        Langit Media Pro <br /> Bekasi, Indonesia
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
