import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ItineraryDay {
    day: number;
    title: string;
    description?: string;
}

interface ItinerarySectionProps {
    itineraryData: ItineraryDay[];
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({
    itineraryData,
}) => {
    const [expandedDay, setExpandedDay] = useState<number | null>(null);

    return (
        <section className="py-10 space-y-5">
            <h2 className="text-2xl font-medium">Itinerary Details</h2>
            <p className="text-base text-justify font-medium text-foreground/80">
                We meticulously planned each day to ensure you enjoy the finest
                experiences. From exploring historic landmarks to savoring local
                cuisine, each day promises adventure and excitement. Embark with
                us on a journey through the world&apos;s most captivating
                destinations.
            </p>
            <div className="space-y-4">
                {itineraryData.map((day, index) => (
                    <div key={index} className="border-b overflow-hidden">
                        <Button
                            className="w-full flex items-center justify-between p-4 text-left bg-transparent shadow-none hover:bg-transparent"
                            onClick={() =>
                                setExpandedDay(
                                    expandedDay === day.day ? null : day.day
                                )
                            }
                        >
                            <div className="flex items-center space-x-2 text-primary text-base font-bold">
                                <span>DAY {day.day}</span>
                                <span className="mx-2">-</span>
                                <span className="text-foreground font-medium">
                                    {day.title}
                                </span>
                            </div>
                            <Icon
                                icon="ic:outline-keyboard-arrow-down"
                                width="32px"
                                height="32px"
                                className={`size-10 text-primary transition-transform ${
                                    expandedDay === day.day ? "rotate-180" : ""
                                }`}
                            />
                        </Button>
                        {expandedDay === day.day && day.description && (
                            <div className="p-4 pt-0 bg-transparent">
                                <p className="text-foreground/70 font-medium">
                                    {day.description}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ItinerarySection;
