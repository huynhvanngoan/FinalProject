import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface TourCardProps {
    imageUrl?: string;
    days: number;
    title: string;
    location: string;
    date: string;
    price: number;
    rating: number;
}

const TourCard: React.FC<TourCardProps> = ({
    imageUrl,
    days,
    title,
    location,
    date,
    price,
    rating,
}) => {
    return (
        <div className="bg-white w-full shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer group transform transition-transform duration-300 hover:scale-105">
            {/* Image Section */}
            <div className="relative w-full 4k:h-[400px] xxl:h-[300px] xl:h-[220px] lg:h-[200px] md:h-[170px] sm:h-[150px] xs:h-[150px] h-[250px]">
                <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    {/* Placeholder for Image */}
                    <Image
                        fill
                        src={imageUrl || "/placeholder.png"}
                        alt={title}
                        className="object-cover size-full"
                    />
                </div>

                {/* Days Badge */}
                <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full group-hover:hidden">
                    {days} Days
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 flex flex-col items-center justify-center text-white text-sm font-semibold group-hover:opacity-100 transition-opacity duration-300">
                    <Icon icon="mdi:eye" className="mb-2" width={30} />
                    View Details
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <span className="text-primary font-bold text-lg">
                        ${price}
                    </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Icon
                        icon="mdi:map-marker"
                        className="mr-1 text-primary"
                        width={16}
                    />
                    {location}
                </div>
                <hr className="mb-4" />

                {/* Footer Section */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{date}</span>
                    <div className="flex items-center">
                        <Icon
                            icon="ic:round-star"
                            className="text-primary mr-1"
                            width={16}
                        />
                        {rating}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourCard;