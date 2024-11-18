import React from "react";
import HighlightTitle from "../shared/HighlightTitle";
import AppHeader from "../shared/AppHeader";
import ReviewCard from "./ReviewCard";
import NextPrevButton from "../shared/NextPrevButton";

const TravelExperiences = () => {
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
                <NextPrevButton
                    canPrev={false}
                    canNext={true}
                    // onPrev={() => console.log("Go to previous")}
                    // onNext={() => console.log("Go to next")}
                />
            </div>
            <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </section>
    );
};

export default TravelExperiences;
