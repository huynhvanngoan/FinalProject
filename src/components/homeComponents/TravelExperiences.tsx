"use client"
import React from "react";
import HighlightTitle from "../shared/HighlightTitle";
import AppHeader from "../shared/AppHeader";
import ReviewCard from "./ReviewCard";
import NextPrevButton from "../shared/NextPrevButton";
import { usePagination } from "@/hooks/usePagination";

interface Testimonial {
    id: number;
    username: string;
    reviewText: string;
    stars: number;
    date: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        username: "Alice",
        reviewText: "Amazing experience, would recommend to everyone!",
        stars: 5,
        date: "2023-09-15",
    },
    {
        id: 2,
        username: "Bob",
        reviewText: "Great service and wonderful destinations.",
        stars: 4.3,
        date: "2023-08-10",
    },
    {
        id: 3,
        username: "Charlie",
        reviewText: "A memorable trip with excellent guidance!",
        stars: 5,
        date: "2023-07-22",
    },
    {
        id: 4,
        username: "Diana",
        reviewText: "Good experience but could be better organized.",
        stars: 3,
        date: "2023-06-30",
    },
    {
        id: 5,
        username: "Eve",
        reviewText: "Beautiful places and very comfortable travel.",
        stars: 4,
        date: "2023-05-18",
    },
    {
        id: 6,
        username: "Frank",
        reviewText: "Unforgettable journey with amazing people.",
        stars: 5,
        date: "2023-04-05",
    },
];

const TravelExperiences = () => {
    const { currentData, handleNext, handlePrev, isFirstPage, isLastPage } =
        usePagination<Testimonial>({
            data: testimonials,
            itemsPerPage: 3, // Changed to 3 to match grid-cols-3 for large screens
        });

    return (
        <section className="w-full flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <HighlightTitle
                        text="Latest Testimonial"
                        className="text-foreground"
                    />
                    <AppHeader text="Traveling Experiences" />
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
            <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {currentData.map((testimonial) => (
                    <ReviewCard
                        key={testimonial.id}
                        username={testimonial.username}
                        reviewText={testimonial.reviewText}
                        stars={testimonial.stars}
                        date={testimonial.date}
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

export default TravelExperiences;
