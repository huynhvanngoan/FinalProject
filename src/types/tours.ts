import { StaticImageData } from "next/image";
export interface Tour {
    id?: string | number;
    title: string;
    location: string;
    photo?: string | StaticImageData;
    price: number;
    startDate: string | Date;
    duration: string | number;
    description: string;
    type: {
        id: string | number;
        name: string;
    };
    destination: {
        id: string | number;
        name: string;
        photo?: string | StaticImageData;
        description: string;
    } | null; // Allow null for tours without destinations
}

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
