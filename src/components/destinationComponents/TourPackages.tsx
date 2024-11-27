/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import AppHeader from "../shared/AppHeader";
import TourCard from "../shared/TourCard";
import NextPrevButton from "../shared/NextPrevButton";
import { usePathname } from "next/navigation";
import MilforSoundAdventure from "@/public/MilfordSoundAdventure.jpg";
import RotoruaGeothermalWonders from "@/public/RotoruaGeothermalWonders.jpg";
import HobbitonandTolkienLandscapes from "@/public/HobbitonandTolkienLandscapes.jpg";
import QueenstownExtremeSportsExpedition from "@/public/QueenstownExtremeSportsExpedition.jpg";
import WellingtonCulturalHeritageTour from "@/public/WellingtonCulturalHeritageTour.jpg";
// Tour list data
const tourListData = [
    {
        id: 1,
        imageUrl: MilforSoundAdventure,
        days: 7,
        title: "Milford Sound Adventure",
        location: "South Island, New Zealand",
        date: "September 15, 2024",
        price: 250,
        rating: 4.7,
        link: "milford-sound-adventure",
    },
    {
        id: 2,
        imageUrl: RotoruaGeothermalWonders,
        days: 5,
        title: "Rotorua Geothermal Wonders",
        location: "North Island, New Zealand",
        date: "October 10, 2024",
        price: 180,
        rating: 4.5,
        link: "rotorua-geothermal-tour",
    },
    {
        id: 3,
        imageUrl: HobbitonandTolkienLandscapes,
        days: 4,
        title: "Hobbiton and Tolkien Landscapes",
        location: "Matamata, New Zealand",
        date: "November 5, 2024",
        price: 150,
        rating: 4.6,
        link: "hobbiton-movie-set-tour",
    },
    {
        id: 4,
        imageUrl: QueenstownExtremeSportsExpedition,
        days: 9,
        title: "Queenstown Extreme Sports Expedition",
        location: "South Island, New Zealand",
        date: "December 20, 2024",
        price: 300,
        rating: 4.8,
        link: "queenstown-adventure-tour",
    },
    {
        id: 5,
        imageUrl: WellingtonCulturalHeritageTour,
        days: 6,
        title: "Wellington Cultural Heritage",
        location: "North Island, New Zealand",
        date: "August 25, 2024",
        price: 200,
        rating: 4.4,
        link: "wellington-culture",
    },
];

const ITEMS_PER_PAGE = 4; // Number of items to show per page

const TourPackages = () => {
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(0);

    const [locale, ...rest] = pathname.split("/");
    const slug = rest.join("/");

    // Calculate total number of pages
    const totalPages = Math.ceil(tourListData.length / ITEMS_PER_PAGE);

    // Get current page items
    const getCurrentPageItems = () => {
        const start = currentPage * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return tourListData.slice(start, end);
    };

    // Handle navigation
    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Check if we can navigate
    const canNext = currentPage < totalPages - 1;
    const canPrev = currentPage > 0;

    return (
        <section className="flex flex-col gap-14">
            <div className="flex flex-row justify-between">
                <AppHeader text="destination-tour-packages" />
                <div className="hidden sm:block">
                    <NextPrevButton
                        canNext={canNext}
                        canPrev={canPrev}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                </div>
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5 lg:gap-10">
                {getCurrentPageItems().map((tour) => (
                    <TourCard
                        key={tour.id}
                        imageUrl={tour.imageUrl}
                        days={tour.days}
                        title={tour.title}
                        location={tour.location}
                        date={tour.date}
                        price={tour.price}
                        rating={tour.rating}
                        link={`/${slug}/${tour.link}`}
                    />
                ))}
            </div>
            <div className="mx-auto block sm:hidden">
                <NextPrevButton
                    canNext={canNext}
                    canPrev={canPrev}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            </div>
        </section>
    );
};

export default TourPackages;
