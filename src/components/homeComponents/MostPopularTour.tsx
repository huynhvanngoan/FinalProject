"use client";
import React, { useEffect, useState } from "react";
import TourCard from "../shared/TourCard";
import AppHeader from "../shared/AppHeader";
import { usePathname } from "next/navigation";
import { useDataContext } from "@/app/context/AppContext";
import tourApiRequest from "@/apiRquest/tour";
import { formatDate, formatLink } from "@/utils/formatter";

const MostPopularTour = () => {
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const { tours, setTours } = useDataContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchTours = async () => {
            try {
                setLoading(true);
                const response = await tourApiRequest.tour();

                if (response.status === 200) {
                    // Sort tours by rating in descending order and limit to top 4
                    const sortedTours = response.payload.data
                        .sort((a: any, b: any) => b.rating - a.rating) // Sort by rating (descending)
                        .slice(0, 4); // Limit to top 4 tours

                    setTours(sortedTours);
                }
            } catch (error: any) {
                setError(
                    error.message || "An error occurred while fetching tours"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    if (loading) {
        return (
            <section className="flex justify-center items-center h-full">
                <p>Loading tours...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex justify-center items-center h-full">
                <p className="text-red-500">{error}</p>
            </section>
        );
    }

    return (
        <section className="flex flex-col gap-12 size-full">
            <AppHeader text="most-popular-tour" />
            <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5 lg:gap-10">
                {tours.map((tour: any) => (
                    <TourCard
                        key={tour.id}
                        imageUrl={tour.photo}
                        days={tour.duration}
                        title={tour.title}
                        location={tour.location}
                        // Format startDate to readable format
                        date={formatDate(tour.startDate)}
                        price={tour.price}
                        rating={tour?.rating}
                        // Convert title to lowercase and replace spaces with hyphens
                        link={`/${locale}/our-tour/${formatLink(tour.title)}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default MostPopularTour;
