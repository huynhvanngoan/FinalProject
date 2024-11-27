/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Banner from "@/components/shared/Banner";
import React, { useState } from "react";
import bgImg from "@/public/ourtour.jpg";
import TourCard from "@/components/shared/TourCard";

import ClientLogos from "@/components/homeComponents/ClientLogos";
import PaginationCustom from "@/components/shared/Pagination";
import { paginate } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { tourData } from "@/data/tourData";

const OurTour = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const { paginatedItems: currentTours, totalPages } = paginate(
        tourData,
        currentPage,
        itemsPerPage
    );

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    return (
        <main className="size-full flex flex-col">
            <Banner bgImage={bgImg} title="Our Tour" />
            <div className="flex flex-col gap-y-20 p-10 lg:p-16 xl:p-24 size-full">
                <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5">
                    {currentTours.map((tour, index) => (
                        <TourCard
                            key={index}
                            imageUrl={tour.imageUrl}
                            days={tour.days}
                            title={tour.title}
                            location={tour.location}
                            date={tour.date}
                            price={tour.price}
                            rating={tour.rating}
                            link={`/${locale}/our-tour/${tour.link}`}
                        />
                    ))}
                </div>

                <PaginationCustom
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
            <ClientLogos />
        </main>
    );
};

export default OurTour;
