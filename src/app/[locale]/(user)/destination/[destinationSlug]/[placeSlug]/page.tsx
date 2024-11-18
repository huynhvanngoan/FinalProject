"use client";
import React from "react";
import bgImg from "@/public/DestinationDetails.jpg";
import Banner from "@/components/shared/Banner";
import { usePathname } from "next/navigation";
import getCapitalizedTitleFromPath from "@/utils/helpers";

const DestinationBookTour = () => {
    const pathname = usePathname();
    const title = getCapitalizedTitleFromPath(pathname);

    return (
        <main className="flex flex-col size-full">
            <Banner bgImage={bgImg} title={title} />
        </main>
    );
};

export default DestinationBookTour;
