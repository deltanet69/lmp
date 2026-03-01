"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function Map() {
    const position: [number, number] = [-6.1806227, 106.9936612];

    // Generate a truly unique ID for each mount to prevent ID collisions
    // especially during HMR or fast navigation.
    const [mapId] = useState(() => `leaflet-map-${Math.random().toString(36).substring(2, 9)}`);

    // Clean up the Leaflet container reference on unmount more thoroughly
    useEffect(() => {
        return () => {
            const container = document.getElementById(mapId);
            if (container) {
                // Clear the internal Leaflet ID associated with this DOM element
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (container as any)._leaflet_id = null;

                // Also check if any parent has it (sometimes happens with react-leaflet)
                if (container.parentElement) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (container.parentElement as any)._leaflet_id = null;
                }
            }
        };
    }, [mapId]);

    return (
        <div className="w-full h-[500px] z-0 relative isolate">
            <MapContainer
                key={mapId}
                id={mapId}
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
