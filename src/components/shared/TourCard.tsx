import React from "react";
import { Icon } from "@iconify/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface TourCardProps {
    imageUrl?: string | StaticImageData;
    days: any;
    title: string;
    location: string;
    date: any;
    price: number;
    rating?: number;
    link?: string;
}

const TourCard: React.FC<TourCardProps> = ({
    imageUrl,
    days,
    title,
    location,
    date,
    price,
    rating,
    link = "/",
}) => {
    const t = useTranslations("General");
    return (
        <Link href={link}>
            <div className="bg-white w-full shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer group transform transition-transform duration-300 hover:scale-105">
                {/* Image Section */}
                <div className="relative w-full 4k:h-[400px] xxl:h-[300px] xl:h-[220px] lg:h-[200px] md:h-[170px] sm:h-[150px] xs:h-[150px] h-[250px]">
                    <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                        {/* Placeholder for Image */}
                        <Image
                            fill
                            src={imageUrl || "/placeholder.png"}
                            alt={title}
                            className="object-cover size-full"
                        />
                    </div>

                    {/* Days Badge */}
                    <div className="absolute top-2 right-2 bg-gray-800 text-primary text-xs px-2 py-1 rounded-full group-hover:hidden">
                        {days} {t("days")}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 flex flex-col items-center justify-center text-primary text-sm font-semibold group-hover:opacity-100 transition-opacity duration-300">
                        <Icon icon="mdi:eye" className="mb-2" width={30} />
                        {t("view-details")}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-lg text-primary font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                            {title}
                        </h3>

                        <span className="text-primary font-bold text-sm">
                            ${price}/{t("person")}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                        <Icon
                            icon="mdi:map-marker"
                            className="mr-1 text-primary"
                            width={16}
                        />
                        {location}
                    </div>
                    <hr className="mb-4" />

                    {/* Footer Section */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{date}</span>
                        <div className="flex items-center">
                            <Icon
                                icon="ic:round-star"
                                className="text-primary mr-1"
                                width={16}
                            />
                            {rating}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TourCard;
