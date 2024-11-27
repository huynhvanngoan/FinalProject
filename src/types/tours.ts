export interface Tour {
    id: string | number;
    title: string;
    location: string;
    thumbnails: string[];
    photo: string;
    price: number;
    startDate: string | Date;
    rating: number;
    duration: string | number;
    description: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    typeId: string | number;
    packageId: string | number;
    destinationId: string | number;
}

import { StaticImageData } from "next/image";

// Type definition for a single tour
export type TourCardType = {
    imageUrl: string | StaticImageData;
    days: number;
    title: string;
    location: string;
    date: string;
    price: number;
    rating: number;
    link: string;
};

// Type definition for tour categories
export type TourCategories = {
    all: TourCardType[];
    trekking: TourCardType[];
    beach: TourCardType[];
    icebergs: TourCardType[];
    mountain: TourCardType[];
    waterfall: TourCardType[];
};

// Type definition for tour category key
export type TourCategoryKey = keyof TourCategories;

export function isTourCategoryKey(key: string): key is TourCategoryKey {
    return [
        "all",
        "trekking",
        "beach",
        "icebergs",
        "mountain",
        "waterfall",
    ].includes(key);
}
