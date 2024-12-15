/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import AppHeader from "../shared/AppHeader";
import TourCard from "../shared/TourCard";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

import { TourCardType, TourCategoryKey } from "@/types/tours";
import { allTourData } from "@/data/tourData";
import { useTranslations } from "next-intl";

function isTourCategoryKey(key: string): key is TourCategoryKey {
    return [
        "all",
        "trekking",
        "beach",
        "icebergs",
        "mountain",
        "waterfall",
    ].includes(key);
}
const ExplorePlace = () => {
    const [activeCategory, setActiveCategory] =
        useState<TourCategoryKey>("all");
    const router = useRouter();
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const t = useTranslations("General");
    const categories = [
        { name: "All", key: "all" },
        { name: "Trekking", key: "trekking" },
        { name: "Beach", key: "beach" },
        { name: "Icebergs", key: "icebergs" },
        { name: "Mountain", key: "mountain" },
        { name: "Waterfall", key: "waterfall" },
    ];
    const handleCategoryChange = (key: string) => {
        if (isTourCategoryKey(key)) {
            setActiveCategory(key);
        }
    };

    const displayedTours = allTourData[activeCategory].slice(0, 8);
    return (
        <section className="flex flex-col gap-5">
            <div className="flex xl:flex-row flex-col justify-between">
                <div className="w-full xl:flex-start flex-center">
                    <AppHeader text="explore-place" />
                </div>
                <ul className="w-full max-w-full ml-auto  flex items-center justify-between xs:gap-10 mobile:gap-3 gap-2">
                    {categories.map((category) => (
                        <li
                            key={category.key}
                            className={`cursor-pointer ${
                                activeCategory === category.key
                                    ? "text-primary font-bold"
                                    : ""
                            } 
                                ${
                                    category.key === "all"
                                        ? "hidden xs:block"
                                        : category.key === "beach"
                                        ? "hidden xs:block"
                                        : ""
                                }`}
                            onClick={() => handleCategoryChange(category.key)}
                        >
                            {t(category.key)}
                        </li>
                    ))}
                    <li>
                        <Button
                            className="bg-primary rounded-full p-3 text-white"
                            onClick={() => router.push(`${locale}/our-tour`)}
                        >
                            {t("view-all")}
                        </Button>
                    </li>
                </ul>
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5 lg:gap-10">
                {displayedTours.map((tour: TourCardType, index: number) => (
                    <TourCard
                        key={`${activeCategory}-${index}`}
                        imageUrl={tour.imageUrl}
                        days={tour.days}
                        title={tour.title}
                        location={tour.location}
                        date={tour.date}
                        price={tour.price}
                        rating={tour.rating}
                        link={`/${locale}/our-tour/${tour.link}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default ExplorePlace;
