import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const ReviewCard = () => {
    return (
        <div className="flex flex-col p-3 border border-gray-400 rounded-md w-full">
            <div className="flex gap-2 items-center">
                <div className="size-10 bg-slate-500 rounded-full"></div>
                <span className="font-bold text-foreground">Username</span>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
                nisi vel turpis hendrerit condimentum. Donec at ipsum at mauris
                consectetur posuere.
            </p>
            <div className="flex flex-col gap-2 items-start">
                <div className="flex gap-2 flex-center">
                    <span>(5 stars)</span>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                            <Icon
                                key={index}
                                icon="mdi:star"
                                className="text-primary size-5"
                            />
                        ))}
                    </div>
                </div>
                <span>Posted on: 2021-01-01</span>
            </div>
        </div>
    );
};

export default ReviewCard;
