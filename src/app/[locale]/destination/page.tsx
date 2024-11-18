"use client"
import ClientLogos from "@/components/homeComponents/ClientLogos";
import Banner from "@/components/shared/Banner";
import React, { useState } from "react";
import bgImg from "@/public/destination.jpg";
import DestinationCard from "@/components/destinationComponents/DestinationCard";
import { Button } from "@/components/ui/button";

const destinations = [
    {
        image: "/new-zealand.jpg",
        title: "New Zealand",
        description: "Aoraki / Mount Cook",
    },
    {
        image: "/elephant-beach.jpg",
        title: "Elephant Beach",
        description: "Island Beach",
    },
    {
        image: "/greece.jpg",
        title: "Greece",
        description: "Santorini Beach",
    },
    {
        image: "/japan.jpg",
        title: "Japan",
        description: "Kinkaku-ji",
    },
    {
        image: "/paris.jpg",
        title: "Paris",
        description: "Eiffel Tower",
    },
    {
        image: "/thailand.jpg",
        title: "Thailand",
        description: "Bangkok",
    },
    {
        image: "/dubai.jpg",
        title: "Dubai",
        description: "Burj Khalifa",
    },
    {
        image: "/vietnam.jpg",
        title: "Vietnam",
        description: "Temple Of Literature",
    },
    {
        image: "/france.jpg",
        title: "France",
        description: "Palace of Versailles",
    },
    {
        image: "/france.jpg",
        title: "France",
        description: "Palace of Versailles",
    },
    {
        image: "/paris.jpg",
        title: "Paris",
        description: "Eiffel Tower",
    },
    {
        image: "/thailand.jpg",
        title: "Thailand",
        description: "Bangkok",
    },
    {
        image: "/dubai.jpg",
        title: "Dubai",
        description: "Burj Khalifa",
    },
    {
        image: "/vietnam.jpg",
        title: "Vietnam",
        description: "Temple Of Literature",
    },
    {
        image: "/france.jpg",
        title: "France",
        description: "Palace of Versailles",
    },
    {
        image: "/france.jpg",
        title: "France",
        description: "Palace of Versailles",
    },
];

const Destination = () => {
    const [visibleCount, setVisibleCount] = useState(10); // Số card hiển thị

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    return (
        <main className="size-full flex flex-col">
            <Banner bgImage={bgImg} title="Destination" />
            <div className="flex flex-col p-10 gap-4 lg:p-16 xl:p-24 size-full">
                {Array.from({
                    length: Math.ceil(
                        Math.min(destinations.length, visibleCount) / 5
                    ),
                }).map((_, blockIndex) => {
                    const blockDestinations = destinations.slice(
                        blockIndex * 5,
                        blockIndex * 5 + 5
                    );
                    const isLargeCardLeft = blockIndex % 2 === 0;

                    return (
                        <div
                            key={blockIndex}
                            className="flex lg:flex-row flex-col gap-4 size-full"
                        >
                            {isLargeCardLeft && (
                                <div className="size-full">
                                    <DestinationCard
                                        image={blockDestinations[0]?.image}
                                        title={blockDestinations[0]?.title}
                                        description={
                                            blockDestinations[0]?.description
                                        }
                                        height="h-[780px]"
                                    />
                                </div>
                            )}
                            {/* Các card nhỏ */}
                            <div className="grid xs:grid-cols-2  gap-4 w-full">
                                {blockDestinations
                                    .slice(1)
                                    .map((destination, index) => (
                                        <DestinationCard
                                            key={index}
                                            image={destination.image}
                                            title={destination.title}
                                            description={
                                                destination.description
                                            }
                                            height="h-[380px]" // Card nhỏ cao hơn một chút
                                        />
                                    ))}
                            </div>
                            {!isLargeCardLeft && (
                                <div className="size-full">
                                    <DestinationCard
                                        image={blockDestinations[0]?.image}
                                        title={blockDestinations[0]?.title}
                                        description={
                                            blockDestinations[0]?.description
                                        }
                                        height="h-[780px]"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
                {visibleCount < destinations.length && (
                    <div className="w-full flex-center mt-10">
                        <Button className="rounded-full p-5" onClick={loadMore}>
                            Load More
                        </Button>
                    </div>
                )}
            </div>
            <ClientLogos />
        </main>
    );
};

export default Destination;
