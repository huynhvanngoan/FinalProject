"use client";
import Banner from "@/components/shared/Banner";
import React from "react";
import bgImg from "@/public/Destinationpackage.jpg";
import { usePathname } from "next/navigation";
import FeatureCard from "@/components/homeComponents/FeatureCard";
import InfoPackage from "@/components/shared/InfoPackage";
import AboutDetails from "@/components/destinationComponents/AboutDetails";
import TourPackages from "@/components/destinationComponents/TourPackages";
import getCapitalizedTitleFromPath from "@/utils/helpers";

const DestinationDetails = () => {
    const pathname = usePathname();
    const title = getCapitalizedTitleFromPath(pathname);
    const infoData = {
        packages: 5,
        contact: "+987 654 3210",
        email: "support@example.com",
    };

    const progressData = {
        reviewProgress: 85,
        activitiesProgress: 70,
        destinationProgress: 95,
    };
    return (
        <main className="size-full flex flex-col">
            <Banner bgImage={bgImg} title={title} />
            <InfoPackage infoData={infoData} />
            <div className="flex flex-col p-5 sm:p-10 gap-28 lg:p-16 xl:p-24 size-full">
                <AboutDetails progressData={progressData} />
                <FeatureCard />
                <TourPackages />
            </div>
        </main>
    );
};

export default DestinationDetails;
