import React from "react";
import ReviewCard from "./ViewReviews";
import ReviewsInput from "./ReviewsInput";

const Review = () => {
    const handleReviewSubmit = (review: {
        rating: number;
        comment: string;
    }) => {
        // Xử lý submit review ở đây
        console.log(review);
    };

    return (
        <div>
            <ReviewCard />
            <ReviewsInput onSubmit={handleReviewSubmit} />
        </div>
    );
};

export default Review;
