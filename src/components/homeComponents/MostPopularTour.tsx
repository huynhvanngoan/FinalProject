/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import TourCard from "../shared/TourCard";
import AppHeader from "../shared/AppHeader";
import SokNationPark from "@/public/SokNationalPark.jpg";
import PhangNgaBay from "@/public/phangngabay.jpg";
import YosemiteNationalPark from "@/public/yosemite.jpg";
import GreateBarrierBeef from "@/public/GreatBarrierReefAdventure.jpg";
import { usePathname } from "next/navigation";
const tourListData = [
    {
        id: 1,
        imageUrl: SokNationPark,
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
        imageUrl: PhangNgaBay,
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
        imageUrl: YosemiteNationalPark,
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
        imageUrl: GreateBarrierBeef,
        days: 10,
        title: "Great Barrier Reef",
        location: "Australia",
        date: "November 25, 2024",
        price: 300,
        rating: 4.9,
        link: "great-barrier-reef",
    },
];
interface Post {
    id: number;
    title: string;
    // Add other properties as needed
}

// Define an interface for the API response
interface PostsResponse {
    data: Post[];
    total: number;
    page: number;
    limit: number;
}

const MostPopularTour = () => {
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch method using fetch API
    const fetchPostsFetch = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts?language=en&page=1&limit=10`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data: PostsResponse = await response.json();
            setPosts(data.data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setLoading(false);
        }
    };
    useEffect(() => {
        // Choose either fetchPostsFetch or fetchPostsAxios
        fetchPostsFetch(); // or fetchPostsFetch
    }, []); // Empty dependency array means this runs once on component mount
    console.log(123, posts);
    // Loading and error handling
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="flex flex-col gap-12 size-full">
            <AppHeader text="section_title" />
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
                        link={`/${locale}/${tour.link}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default MostPopularTour;
