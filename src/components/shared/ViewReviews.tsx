/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

type Review = {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
};

// StarRating Component with decimal support for average rating
const StarRating = memo(
    ({
        rating,
        isAverage = false,
    }: {
        rating: number;
        isAverage?: boolean;
    }) => {
        const getStarIcon = (index: number) => {
            // For user reviews, round to whole numbers
            const effectiveRating = isAverage ? rating : Math.round(rating);
            const difference = effectiveRating - index;

            if (difference >= 1) {
                // Full star
                return (
                    <Icon
                        key={index}
                        icon="material-symbols:star"
                        className="text-yellow-400 transition-all duration-200"
                        width={isAverage ? 16 : 20}
                    />
                );
            } else if (difference > 0 && isAverage) {
                // Partial star (only for average rating)
                return (
                    <div key={index} className="relative">
                        <Icon
                            icon="material-symbols:star"
                            className="text-gray-200"
                            width={16}
                        />
                        <div
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: `${difference * 100}%` }}
                        >
                            <Icon
                                icon="material-symbols:star"
                                className="text-yellow-400"
                                width={16}
                            />
                        </div>
                    </div>
                );
            } else {
                // Empty star
                return (
                    <Icon
                        key={index}
                        icon="material-symbols:star"
                        className="text-gray-200"
                        width={isAverage ? 16 : 20}
                    />
                );
            }
        };

        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => getStarIcon(idx))}
            </div>
        );
    }
);
StarRating.displayName = "StarRating";

// ReviewCard Component
const ReviewCard = memo(({ review }: { review: Review }) => (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-100">
        <div className="flex gap-4">
            <div className="relative">
                <Image
                    src={review.avatar}
                    alt={`${review.name}'s avatar`}
                    width={56}
                    height={56}
                    className="rounded-full object-cover ring-2 ring-yellow-400/30"
                />
            </div>
            <div className="flex-1">
                <div className="flex xs:flex-row flex-col justify-between items-start">
                    <h3 className="font-semibold text-lg text-gray-800">
                        {review.name}
                    </h3>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                    <StarRating rating={review.rating} />
                    <span className="text-lg font-medium text-yellow-500">
                        {Math.round(review.rating)}
                    </span>
                </div>
                <p className="text-gray-600 mt-3 leading-relaxed">
                    {review.comment}
                </p>
            </div>
        </div>
    </div>
));
ReviewCard.displayName = "ReviewCard";

// ReviewHeader Component
const ReviewHeader = memo(
    ({
        totalReviews,
        averageRating,
    }: {
        totalReviews: number;
        averageRating: string;
    }) => (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6  rounded-lg shadow-sm mb-8">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Client Reviews
                    </h2>
                    <p className="text-gray-600 mt-1">
                        What our customers are saying
                    </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3">
                        <StarRating
                            rating={Number(averageRating)}
                            isAverage={true}
                        />
                        <span className="text-xl font-bold text-yellow-500">
                            {averageRating}
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Based on {totalReviews} reviews
                    </p>
                </div>
            </div>
        </div>
    )
);
ReviewHeader.displayName = "ReviewHeader";

// Main Component
const ViewReviews = memo(() => {
    const reviews: Review[] = [
        {
            id: 1,
            name: "Rohan De Spond",
            rating: 4.7,
            date: "25 JAN 2021",
            comment:
                "Greate tour",
            avatar: "/api/placeholder/48/48",
        },
        {
            id: 2,
            name: "John Doe",
            rating: 3.8,
            date: "26 JAN 2021",
            comment:
                "So beautiful.",
            avatar: "/api/placeholder/48/48",
        },
    ];

    const averageRating = useMemo(
        () =>
            (
                reviews.reduce((acc, { rating }) => acc + rating, 0) /
                reviews.length
            ).toFixed(1),
        [reviews]
    );

    return (
        <div className="w-full mb-8">
            <ReviewHeader
                totalReviews={reviews.length}
                averageRating={averageRating}
            />
            <div className="space-y-6">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
});
ViewReviews.displayName = "ViewReviews";

export default ViewReviews;
