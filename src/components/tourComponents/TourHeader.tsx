import { Icon } from "@iconify/react";
import React from "react";

interface TourHeaderProps {
    title: string;
    price: number | string;
    location: string;
    details: string;
}

const TourHeader: React.FC<TourHeaderProps> = ({
    title,
    price,
    location,
    details,
}) => (
    <div className="pb-10 border-b-2 space-y-3">
        <div className="flex justify-between items-center text-4xl font-bold">
            <span className="font-semibold">{title}</span>
            <span className="text-primary">${price}/Person</span>
        </div>
        <div className="flex items-center text-base font-medium space-x-4">
            <div className="flex items-center gap-2 border-r-2 pr-4 text-primary">
                <Icon icon="basil:location-outline" width="1.2em" />
                <span>{location}</span>
            </div>
            <span className="pl-4 text-foreground/60">{details}</span>
        </div>
    </div>
);

export default TourHeader;
