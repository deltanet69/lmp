"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const POSITION: [number, number] = [-6.1806227, 106.9936612];

export default function Map() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<import("leaflet").Map | null>(null);

    useEffect(() => {
        // Guard: must run client-side only, and only once
        if (!containerRef.current || mapRef.current) return;

        let map: import("leaflet").Map;

        (async () => {
            const L = (await import("leaflet")).default;

            // Safety: if Leaflet already initialised this container, wipe it first
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((containerRef.current as any)._leaflet_id) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (containerRef.current as any)._leaflet_id = null;
            }

            // Fix default marker icon paths for Next.js / webpack
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });

            map = L.map(containerRef.current!, {
                center: POSITION,
                zoom: 15,
                scrollWheelZoom: true,
            });

            mapRef.current = map;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker(POSITION)
                .addTo(map)
                .bindPopup("Langit Media Pro<br/>Bekasi, Indonesia");
        })();

        // Cleanup: properly destroy map on unmount (React StrictMode / HMR safe)
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // empty deps — run once on mount

    return (
        <div
            ref={containerRef}
            className="w-full h-[500px] z-0 relative isolate"
            style={{ zIndex: 0 }}
        />
    );
}
