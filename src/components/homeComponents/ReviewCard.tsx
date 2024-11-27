import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useTranslations } from "next-intl";
interface ReviewCardProps {
    username: string;
    reviewText: string;
    stars: number;
    date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
    username,
    reviewText,
    stars,
    date,
}) => {
    const TOTAL_STARS = 5;
    const t = useTranslations("General")
    const renderStar = (index: number) => {
        if (index < Math.floor(stars)) {
            // Full star
            return (
                <div className="relative">
                    <Icon
                        key={`full-${index}`}
                        icon="mdi:star"
                        className="size-5 text-primary relative z-10"
                    />
                </div>
            );
        } else if (index === Math.floor(stars) && stars % 1 !== 0) {
            // Half star with gray background
            return (
                <div className="relative">
                    {/* Gray background star */}
                    <Icon
                        key={`bg-${index}`}
                        icon="mdi:star"
                        className="size-5 text-gray-300 absolute inset-0"
                    />
                    {/* Colored half star */}
                    <Icon
                        key={`half-${index}`}
                        icon="mdi:star-half"
                        className="size-5 text-primary relative z-10"
                    />
                </div>
            );
        } else {
            // Empty star
            return (
                <div className="relative">
                    <Icon
                        key={`empty-${index}`}
                        icon="mdi:star"
                        className="size-5 text-gray-300"
                    />
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col p-3 border border-gray-400 rounded-md w-full">
            <div className="flex gap-2 items-center">
                <div className="size-10 bg-slate-500 rounded-full"></div>
                <span className="font-bold text-foreground">{username}</span>
            </div>
            <p>{reviewText}</p>
            <div className="flex flex-col gap-2 items-start">
                <div className="flex gap-2 flex-center">
                    <span>({stars} {t("stars")})</span>
                    <div className="flex gap-1">
                        {[...Array(TOTAL_STARS)].map((_, index) => (
                            <div key={index} className="relative">
                                {renderStar(index)}
                            </div>
                        ))}
                    </div>
                </div>
                <span>{t("posted-on")}: {date}</span>
            </div>
        </div>
    );
};

export default ReviewCard;
