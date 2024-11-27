"use client";
import React from "react";
import BlogCard from "../shared/BlogCard";
import NextPrevButton from "../shared/NextPrevButton";
import AppHeader from "../shared/AppHeader";
import HighlightTitle from "../shared/HighlightTitle";
import Blog from "@/public/blog.jpg";
import Blog2 from "@/public/blog2.jpg";
import Blog3 from "@/public/blog3.jpg";
import Blog4 from "@/public/blog4.jpg";
import Blog5 from "@/public/blog5.jpg";
import { usePagination } from "@/hooks/usePagination";
const blogData = [
    {
        title: "French Alps",
        description: "Explore the beauty of the French Alps",
        readTime: "5",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Blog,
        link: "/blog/french-alps",
    },
    {
        title: "Majestic Beaches",
        description: "Discover the most beautiful beaches in the world",
        readTime: "8",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Blog2,
        link: "/blog/beaches",
    },
    {
        title: "Cultural Wonders",
        description: "Immerse yourself in the world's cultural treasures",
        readTime: "6",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Blog3,
        link: "/blog/cultural-wonders",
    },
    {
        title: "Cultural Wonders",
        description: "Immerse yourself in the world's cultural treasures",
        readTime: "6",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Blog4,
        link: "/blog/cultural-wonders",
    },
    {
        title: "Cultural Wonders",
        description: "Immerse yourself in the world's cultural treasures",
        readTime: "6",
        // imageSrc: "/french-alps.jpg",
        imageSrc: Blog5,
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
                <div className="flex flex-col gap-5">
                    <HighlightTitle
                        text="roaming-tales"
                        className="text-foreground"
                    />
                    <AppHeader text="latest-travel-blog" />
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
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-6">
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
