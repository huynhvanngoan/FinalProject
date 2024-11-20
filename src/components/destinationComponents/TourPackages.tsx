/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import AppHeader from "../shared/AppHeader";
import TourCard from "../shared/TourCard";
import NextPrevButton from "../shared/NextPrevButton";
import { usePathname } from "next/navigation";

// Tour list data
const tourListData = [
    {
        id: 1,
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
        link: "sok-national-park",
    },
    {
        id: 2,
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Phang Nga Bay",
        location: "Thailand",
        date: "September 12, 2024",
        price: 120,
        rating: 4.7,
        link: "phang-nga-bay",
    },
    {
        id: 3,
        imageUrl: "/images/sok-national-park.jpg",
        days: 5,
        title: "Yosemite National Park",
        location: "USA",
        date: "October 15, 2024",
        price: 200,
        rating: 4.8,
        link: "yosemite-national-park",
    },
    {
        id: 4,
        imageUrl: "/images/sok-national-park.jpg",
        days: 10,
        title: "Great Barrier Reef",
        location: "Australia",
        date: "November 25, 2024",
        price: 300,
        rating: 4.9,
        link: "great-barrier-reef",
    },
    {
        id: 4,
        imageUrl: "/images/sok-national-park.jpg",
        days: 10,
        title: "Great Barrier Reef",
        location: "Australia",
        date: "November 25, 2024",
        price: 300,
        rating: 4.9,
        link: "great-barrier-reef",
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
                <AppHeader text="Destination Tour Packages" />
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
