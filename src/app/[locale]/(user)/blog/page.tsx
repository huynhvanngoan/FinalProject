/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Banner from "@/components/shared/Banner";
import PaginationCustom from "@/components/shared/Pagination";
import React, { useState } from "react";
import bgImg from "@/public/blog.jpg";
import Demo from "@/public/chile.jpg";
import BlogCard from "@/components/shared/BlogCard";
import { usePathname } from "next/navigation";
import { paginate } from "@/utils/helpers";

const blogListData = [
    {
        id: 1,
        title: "French Alps",
        description: "Explore the beauty of the French Alps",
        readTime: "5 mins",
        imageSrc: Demo,
        link: "french-alps",
    },
    {
        id: 2,
        title: "Majestic Beaches",
        description: "Discover the most beautiful beaches in the world",
        readTime: "8 mins",
        imageSrc: Demo,
        link: "beaches",
    },
    {
        id: 3,
        title: "Cultural Wonders",
        description: "Immerse yourself in the world's cultural treasures",
        readTime: "6 mins",
        imageSrc: Demo,
        link: "cultural-wonders",
    },
    {
        id: 4,
        title: "Hidden Waterfalls",
        description: "Unveil the secrets of breathtaking hidden waterfalls",
        readTime: "7 mins",
        imageSrc: Demo,
        link: "hidden-waterfalls",
    },
    {
        id: 5,
        title: "Desert Adventures",
        description: "Experience the thrill of the world's vast deserts",
        readTime: "9 mins",
        imageSrc: Demo,
        link: "desert-adventures",
    },
    {
        id: 6,
        title: "Mountain Escapes",
        description: "Find peace in the serenity of mountain landscapes",
        readTime: "5 mins",
        imageSrc: Demo,
        link: "mountain-escapes",
    },
    {
        id: 7,
        title: "Urban Exploration",
        description: "Delve into the hidden corners of bustling cities",
        readTime: "6 mins",
        imageSrc: Demo,
        link: "urban-exploration",
    },
    {
        id: 8,
        title: "Ocean Journeys",
        description: "Sail across the world's magnificent oceans",
        readTime: "8 mins",
        imageSrc: Demo,
        link: "ocean-journeys",
    },
    {
        id: 9,
        title: "Rainforest Retreats",
        description: "Reconnect with nature in lush rainforest settings",
        readTime: "7 mins",
        imageSrc: Demo,
        link: "rainforest-retreats",
    },
    {
        id: 10,
        title: "Winter Wonderlands",
        description: "Experience the magic of snowy winter destinations",
        readTime: "6 mins",
        imageSrc: Demo,
        link: "winter-wonderlands",
    },
    {
        id: 11,
        title: "Island Escapes",
        description: "Relax on idyllic islands around the globe",
        readTime: "5 mins",
        imageSrc: Demo,
        link: "island-escapes",
    },
    {
        id: 12,
        title: "Ancient Ruins",
        description: "Step back in time with visits to ancient ruins",
        readTime: "6 mins",
        imageSrc: Demo,
        link: "ancient-ruins",
    },
    {
        id: 13,
        title: "Safari Adventures",
        description: "Get up close with wildlife on an African safari",
        readTime: "9 mins",
        imageSrc: Demo,
        link: "safari-adventures",
    },
    {
        id: 14,
        title: "Festivals Around the World",
        description: "Celebrate culture and tradition at vibrant festivals",
        readTime: "8 mins",
        imageSrc: Demo,
        link: "festivals",
    },
    {
        id: 15,
        title: "Luxury Resorts",
        description: "Indulge in opulence at the world's finest resorts",
        readTime: "7 mins",
        imageSrc: Demo,
        link: "luxury-resorts",
    },
];

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const itemsPerPage = 8;

    const { paginatedItems: currentBlogs, totalPages } = paginate(
        blogListData,
        currentPage,
        itemsPerPage
    );

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    return (
        <main className="size-full flex flex-col">
            <Banner bgImage={bgImg} title="Blog" />
            <div className="flex flex-col gap-y-20 p-10 lg:p-16 xl:p-24 size-full">
                <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5">
                    {currentBlogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            description={blog.description}
                            readTime={blog.readTime}
                            imageSrc={blog.imageSrc}
                            link={`/${locale}/blog/${blog.link
                                .split("/")
                                .pop()}`}
                        />
                    ))}
                </div>

                <PaginationCustom
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        </main>
    );
};

export default Blog;
