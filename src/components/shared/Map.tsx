import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface MapProps {
    location: string;
    zoom?: number;
}

const Map: React.FC<MapProps> = ({ location, zoom = 14 }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [mapUrl, setMapUrl] = useState("");

    useEffect(() => {
        // Format location for URL
        const formattedLocation = encodeURIComponent(location);
        setMapUrl(`/api/placeholder/600/400`); // Placeholder for demonstration
    }, [location]);

    return (
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
            {/* Map Container */}
            <div className="w-full h-full bg-gray-100">
                <img
                    src={mapUrl}
                    alt={`Map of ${location}`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Location Popup */}
            {showPopup && (
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-[250px]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {location}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {location}, County Hall, 3455C
                            </p>
                            <button
                                className="text-blue-500 text-sm mt-2 hover:text-blue-600"
                                onClick={() =>
                                    window.open(
                                        `https://maps.google.com?q=${encodeURIComponent(
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

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                    className="bg-white w-8 h-8 rounded-sm shadow-lg flex items-center justify-center hover:bg-gray-50"
                    onClick={() => {
                        /* Handle zoom in */
                    }}
                >
                    <span className="text-xl font-bold">+</span>
                </button>
                <button
                    className="bg-white w-8 h-8 rounded-sm shadow-lg flex items-center justify-center hover:bg-gray-50"
                    onClick={() => {
                        /* Handle zoom out */
                    }}
                >
                    <span className="text-xl font-bold">−</span>
                </button>
            </div>
        </div>
    );
};

export default Map;
