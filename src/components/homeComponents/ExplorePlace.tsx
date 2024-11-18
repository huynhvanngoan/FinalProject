import React from "react";
import AppHeader from "../shared/AppHeader";
import TourCard from "../shared/TourCard";
import { Button } from "../ui/button";

const tourData = [
    {
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
    {
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
    {
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
    {
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
    {
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
    {
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
    {
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
    {
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
];

const ExplorePlace = () => {
    return (
        <section className="flex flex-col gap-5">
            <div className="flex xl:flex-row flex-col justify-between">
                <div className="w-full xl:flex-start flex-center">
                    <AppHeader text="Explore Place" />
                </div>
                <ul className="flex-center justify-between xs:gap-10 mobile:gap-3 gap-2">
                    <li className="hidden xs:block">Trekking</li>
                    <li className="hidden mobile:block">Beach</li>
                    <li >Icebergs</li>
                    <li>Mountain</li>
                    <li>Waterfall</li>
                    <li>
                        <Button className="bg-primary rounded-full p-3 text-white">
                            View All
                        </Button>
                    </li>
                </ul>
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5 lg:gap-10">
                {tourData.slice(0, 8).map((tour, index) => (
                    <TourCard
                        key={index}
                        imageUrl={tour.imageUrl}
                        days={tour.days}
                        title={tour.title}
                        location={tour.location}
                        date={tour.date}
                        price={tour.price}
                        rating={tour.rating}
                    />
                ))}
            </div>
        </section>
    );
};

export default ExplorePlace;
