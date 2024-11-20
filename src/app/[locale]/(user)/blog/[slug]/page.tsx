/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Banner from "@/components/shared/Banner";
import React, { useState } from "react";
import bgImg from "@/public/blogdetails.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import TestimonialCard from "@/components/blogComponents/TestimonialCard";
import AppHeader from "@/components/shared/AppHeader";
import NextPrevButton from "@/components/shared/NextPrevButton";
import Demo from "@/public/chile.jpg";
import BlogCard from "@/components/shared/BlogCard";
import { usePathname } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";

const blogListData = [
    {
        id: 1,
        title: "French Alps",
        description: "Explore the beauty of the French Alps",
        readTime: "5 mins",
        imageSrc: Demo,
        link: "/blog/french-alps",
    },
    {
        id: 2,
        title: "Majestic Beaches",
        description: "Discover the most beautiful beaches in the world",
        readTime: "8 mins",
        imageSrc: Demo,
        link: "/blog/beaches",
    },
    {
        id: 3,
        title: "Cultural Wonders",
        description: "Immerse yourself in the world's cultural treasures",
        readTime: "6 mins",
        imageSrc: Demo,
        link: "/blog/cultural-wonders",
    },
    {
        id: 4,
        title: "Hidden Waterfalls",
        description: "Unveil the secrets of breathtaking hidden waterfalls",
        readTime: "7 mins",
        imageSrc: Demo,
        link: "/blog/hidden-waterfalls",
    },
    {
        id: 5,
        title: "Desert Adventures",
        description: "Experience the thrill of the world's vast deserts",
        readTime: "9 mins",
        imageSrc: Demo,
        link: "/blog/desert-adventures",
    },
    {
        id: 6,
        title: "Mountain Escapes",
        description: "Find peace in the serenity of mountain landscapes",
        readTime: "5 mins",
        imageSrc: Demo,
        link: "/blog/mountain-escapes",
    },
    {
        id: 7,
        title: "Urban Exploration",
        description: "Delve into the hidden corners of bustling cities",
        readTime: "6 mins",
        imageSrc: Demo,
        link: "/blog/urban-exploration",
    },
    {
        id: 8,
        title: "Ocean Journeys",
        description: "Sail across the world's magnificent oceans",
        readTime: "8 mins",
        imageSrc: Demo,
        link: "/blog/ocean-journeys",
    },
    {
        id: 9,
        title: "Rainforest Retreats",
        description: "Reconnect with nature in lush rainforest settings",
        readTime: "7 mins",
        imageSrc: Demo,
        link: "/blog/rainforest-retreats",
    },
    {
        id: 10,
        title: "Winter Wonderlands",
        description: "Experience the magic of snowy winter destinations",
        readTime: "6 mins",
        imageSrc: Demo,
        link: "/blog/winter-wonderlands",
    },
    {
        id: 11,
        title: "Island Escapes",
        description: "Relax on idyllic islands around the globe",
        readTime: "5 mins",
        imageSrc: Demo,
        link: "/blog/island-escapes",
    },
    {
        id: 12,
        title: "Ancient Ruins",
        description: "Step back in time with visits to ancient ruins",
        readTime: "6 mins",
        imageSrc: Demo,
        link: "/blog/ancient-ruins",
    },
    {
        id: 13,
        title: "Safari Adventures",
        description: "Get up close with wildlife on an African safari",
        readTime: "9 mins",
        imageSrc: Demo,
        link: "/blog/safari-adventures",
    },
    {
        id: 14,
        title: "Festivals Around the World",
        description: "Celebrate culture and tradition at vibrant festivals",
        readTime: "8 mins",
        imageSrc: Demo,
        link: "/blog/festivals",
    },
    {
        id: 15,
        title: "Luxury Resorts",
        description: "Indulge in opulence at the world's finest resorts",
        readTime: "7 mins",
        imageSrc: Demo,
        link: "/blog/luxury-resorts",
    },
];
const BlogDetails = () => {
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const { currentData, handleNext, handlePrev, isFirstPage, isLastPage } =
    usePagination({
        data: blogListData,
        itemsPerPage: 3, // Changed to 3 to match grid-cols-3 for large screens
    });

    return (
        <main className="size-full flex flex-col">
            <Banner bgImage={bgImg} title="Blog Details" />
            <div className="flex flex-col p-10 lg:p-16 xl:p-24 size-full gap-30">
                <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-[54px] font-semibold">
                            Journey Beyond Borders
                        </h1>
                        <div className="flex flex-col xs:flex-row gap-6">
                            <p>Entrepreneur, Leadership</p>
                            <div className="xs:flex-center flex items-center flex-row gap-2">
                                <Icon icon="mage:clock" />
                                <p>August 07, 2024</p>
                            </div>{" "}
                            <div className="xs:flex-center flex items-center flex-row gap-2">
                                <Icon icon="lucide:dot" />
                                <p>Admin</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-lg text-foreground/60">
                        &quot; Journey Beyond Borders &quot; invites you to
                        embark on an extraordinary travel experience that
                        transcends geographical limits and cultural boundaries.
                        This adventure is designed to immerse you in the heart
                        of diverse cultures, offering the chance to discover
                        hidden gems and engage deeply with local communities. As
                        you traverse breathtaking landscapes and explore vibrant
                        cities, you&apos;ll be introduced to new traditions,
                        cuisines, and ways of life that will enrich your
                        understanding of the world. Each step of your journey is
                        crafted to provide unique adventures and memorable
                        moments, ensuring that your travel experience is both
                        transformative and unforgettable. Whether you&apos;re
                        hiking through majestic mountains, strolling through
                        ancient towns, or savoring local delicacies,
                        &quot;Journey Beyond Borders&quot; promises to elevate
                        your travel experience to new heights, creating memories
                        that will last a lifetime.
                    </p>
                    <div className="flex-center flex-col xxl:flex-row w-full xxl:h-[450px] gap-5 ">
                        <Image
                            src={bgImg}
                            alt=""
                            className="size-full rounded-md object-cover"
                        />{" "}
                        <Image
                            src={bgImg}
                            alt=""
                            className="size-full rounded-md object-cover"
                        />
                    </div>
                    <TestimonialCard />
                    <p className="text-lg text-foreground/60">
                        &quot; Journey Beyond Borders &quot; invites you to
                        embark on an extraordinary travel experience that
                        transcends geographical limits and cultural boundaries.
                        This adventure is designed to immerse you in the heart
                        of diverse cultures, offering the chance to discover
                        hidden gems and engage deeply with local communities. As
                        you traverse breathtaking landscapes and explore vibrant
                        cities, you&apos;ll be introduced to new traditions,
                        cuisines, and ways of life that will enrich your
                        understanding of the world. Each step of your journey is
                        crafted to provide unique adventures and memorable
                        moments, ensuring that your travel experience is both
                        transformative and unforgettable. Whether you&apos;re
                        hiking through majestic mountains, strolling through
                        ancient towns, or savoring local delicacies,
                        &quot;Journey Beyond Borders&quot; promises to elevate
                        your travel experience to new heights, creating memories
                        that will last a lifetime.
                    </p>
                </div>
                <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-row justify-between items-center">
                        <AppHeader text="Recent Travel Blog" />
                        <NextPrevButton
                        onNext={handleNext}
                        onPrev={handlePrev}
                        canNext={!isLastPage}
                        canPrev={!isFirstPage}
                    />
                    </div>
                    <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5">
                        {currentData.map((blog) => (
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
                </div>
            </div>
        </main>
    );
};

export default BlogDetails;
