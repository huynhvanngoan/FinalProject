"use client";
import React from "react";
import BlogCard from "../shared/BlogCard";
import NextPrevButton from "../shared/NextPrevButton";
import AppHeader from "../shared/AppHeader";
import HighlightTitle from "../shared/HighlightTitle";
import Demo from "@/public/chile.jpg";
import { usePagination } from "@/hooks/usePagination";
const blogData = [
    {
        title: "French Alps",
        description: "Explore the beauty of the French Alps",
        readTime: "5 mins",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Demo,
        link: "/blog/french-alps",
    },
    {
        title: "Majestic Beaches",
        description: "Discover the most beautiful beaches in the world",
        readTime: "8 mins",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Demo,
        link: "/blog/beaches",
    },
    {
        title: "Cultural Wonders",
        description: "Immerse yourself in the world's cultural treasures",
        readTime: "6 mins",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Demo,
        link: "/blog/cultural-wonders",
    },
    {
        title: "Cultural Wonders",
        description: "Immerse yourself in the world's cultural treasures",
        readTime: "6 mins",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Demo,
        link: "/blog/cultural-wonders",
    },
    {
        title: "Cultural Wonders",
        description: "Immerse yourself in the world's cultural treasures",
        readTime: "6 mins",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Demo,
        link: "/blog/cultural-wonders",
    },
];
const TravelBlog = () => {
    const { currentData, handleNext, handlePrev, isFirstPage, isLastPage } =
        usePagination({
            data: blogData,
            itemsPerPage: 3, // Changed to 3 to match grid-cols-3 for large screens
        });

    return (
        <section className="w-full flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <HighlightTitle
                        text="Roaming Tales"
                        className="text-foreground"
                    />
                    <AppHeader text="Latest Travel Blog" />
                </div>
                <div className="hidden sm:block">
                    <NextPrevButton
                        onNext={handleNext}
                        onPrev={handlePrev}
                        canNext={!isLastPage}
                        canPrev={!isFirstPage}
                    />
                </div>
            </div>
            <div className="flex gap-6 p-6">
                {/* First Card Design */}
                {currentData.map((blog, index) => (
                    <BlogCard
                        key={index}
                        title={blog.title}
                        description={blog.description}
                        readTime={blog.readTime}
                        imageSrc={blog.imageSrc}
                        link={blog.link}
                    />
                ))}
            </div>
            <div className="mx-auto block sm:hidden">
                <NextPrevButton
                    onNext={handleNext}
                    onPrev={handlePrev}
                    canNext={!isLastPage}
                    canPrev={!isFirstPage}
                />
            </div>
        </section>
    );
};

export default TravelBlog;
