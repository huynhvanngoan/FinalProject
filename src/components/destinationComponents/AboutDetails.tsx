import React from "react";
import HighlightTitle from "../shared/HighlightTitle";
import { Button } from "../ui/button";
import Demo from "@/public/boston-usa.jpg";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Progress } from "../ui/progress";

// Define the shape of the dynamic data
interface AboutDetailData {
    reviewProgress: number;
    activitiesProgress: number;
    destinationProgress: number;
}

// Define the list of about details
const aboutDetails = [
    {
        id: 1,
        icon: "carbon:review",
        title: "Review & Payment",
        description: "Easily review and make secure payments.",
        progressKey: "reviewProgress",
    },
    {
        id: 2,
        icon: "mdi:flight",
        title: "Activities & Transportation",
        description: "Plan activities and book transport with ease.",
        progressKey: "activitiesProgress",
    },
    {
        id: 3,
        icon: "material-symbols:calendar-month",
        title: "Destination & Travel Dates",
        description: "Select your dream destination and dates.",
        progressKey: "destinationProgress",
    },
];

interface AboutDetailsProps {
    progressData: AboutDetailData;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({ progressData }) => {
    return (
        <section className="size-full flex-center flex-row gap-[65px]">
            <div className="w-1/2">
                <HighlightTitle
                    text="Perfect Travel Spot"
                    className="text-foreground"
                />
                <div className="w-full flex flex-col">
                    <h2 className="font-poppins font-bold text-[20px] md:text-[35px] xl:text-[54px] text-foreground leading-normal">
                        Find Your Perfect Travel Destination
                    </h2>
                </div>
                <p className="lg:text-xl text-md text-foreground font-light">
                    Explore breathtaking destinations tailored to your desires.
                    From serene beaches to vibrant cities, let us guide you to
                    your perfect travel spot for unforgettable memories and
                    unparalleled experiences. Start your journey today!
                </p>
                <Button className="mt-10 lg:py-6 py-4 w-24 lg:w-40 rounded-full shadow-md shadow-slate-500">
                    Contact Us
                </Button>
            </div>
            <div className="w-1/3 h-[482px]">
                <Image
                    src={Demo}
                    alt="Travel Destination"
                    className="size-full object-cover rounded-lg shadow-md hover:shadow-gray-500 transition-all duration-300 ease-in-out hover:scale-[1.02]"
                />
            </div>
            <div className="w-1/3 flex flex-col gap-10">
                {aboutDetails.map((detail) => (
                    <div key={detail.id} className="flex flex-col gap-2">
                        <div className="text-primary">
                            <Icon icon={detail.icon} width="48" height="48" />
                        </div>
                        <p className="text-xl font-semibold text-foreground">
                            {detail.title}
                        </p>
                        <p className="text-sm text-secondary-foreground font-light">
                            {detail.description}
                        </p>
                        <Progress
                            value={
                                progressData[
                                    detail.progressKey as keyof AboutDetailData
                                ]
                            }
                            className="h-1"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutDetails;
