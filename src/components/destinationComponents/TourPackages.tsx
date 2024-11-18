"use client";
import React from "react";
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
];

const TourPackages = () => {
    const pathname = usePathname();

    const [locale, ...rest] = pathname.split("/");

   
    const slug = rest.join("/"); 

   

    return (
        <section className="flex flex-col gap-14">
            <div className="flex flex-row justify-between">
                <AppHeader text="Destination Tour Packages" />
                <NextPrevButton canNext={true} canPrev={false} />
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5 lg:gap-10">
                {tourListData.map((tour) => (
                    <TourCard
                        key={tour.id}
                        imageUrl={tour.imageUrl}
                        days={tour.days}
                        title={tour.title}
                        location={tour.location}
                        date={tour.date}
                        price={tour.price}
                        rating={tour.rating}
                        link={`/${locale}/${slug}/${tour.link}`} 
                    />
                ))}
            </div>
        </section>
    );
};

export default TourPackages;
