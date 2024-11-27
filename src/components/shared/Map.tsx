"use client";
import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import L from "leaflet";

interface MapProps {
    location: string;
    zoom?: number;
}

const Map: React.FC<MapProps> = ({ location, zoom = 14 }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [mapError, setMapError] = useState<string>("");
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMapInitialized, setIsMapInitialized] = useState(false);

    // Khởi tạo map
    useEffect(() => {
        // Import Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            link.integrity =
                "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
            link.crossOrigin = "";
            document.head.appendChild(link);
        }

        // Đảm bảo container đã được tạo
        if (!containerRef.current) return;

        // Khởi tạo map nếu chưa có
        if (!mapRef.current) {
            const map = L.map(containerRef.current, {
                zoomControl: true,
                attributionControl: true,
            }).setView([21.0285, 105.8542], zoom);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            mapRef.current = map;
            setIsMapInitialized(true);
        }

        // Cleanup function
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                setIsMapInitialized(false);
            }
        };
    }, []); // Chỉ chạy một lần khi component mount

    // Xử lý cập nhật location
    useEffect(() => {
        if (!isMapInitialized || !mapRef.current) return;

        const map = mapRef.current;

        fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                location
            )}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data && data[0]) {
                    const { lat, lon } = data[0];
                    map.setView([parseFloat(lat), parseFloat(lon)], zoom);

                    // Clear existing markers
                    map.eachLayer((layer) => {
                        if (layer instanceof L.Marker) {
                            layer.remove();
                        }
                    });

                    // Add new marker
                    L.marker([parseFloat(lat), parseFloat(lon)]).addTo(map);
                } else {
                    setMapError("Could not find location");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setMapError("Error loading location");
            });
    }, [location, zoom, isMapInitialized]);

    if (mapError) {
        return (
            <div className="z-0 relative size-full rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
                <p className="text-red-500">{mapError}</p>
            </div>
        );
    }

    return (
        <div className=" z-0  relative size-full rounded-lg overflow-hidden border border-gray-200">
            <div ref={containerRef} className="w-full h-full" />

            {showPopup && (
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-[250px] z-[1000]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {location}
                            </h3>
                            <button
                                className="text-blue-500 text-sm mt-2 hover:text-blue-600"
                                onClick={() =>
                                    window.open(
                                        `https://www.openstreetmap.org/search?query=${encodeURIComponent(
                                            location
                                        )}`,
                                        "_blank"
                                    )
                                }
                            >
                                View Larger Map
                            </button>
                        </div>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Map;
