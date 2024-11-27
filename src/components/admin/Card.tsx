import React from "react";
import { Icon } from "@iconify/react";
const Card = ({ type }: { type: string }) => {
    return (
        <div className="rounded-2xl odd:bg-primary even:bg-[#CFCEFF]/40 p-4 flex-1 min-w-[130px]">
            <div className="flex justify-between items-center">
                <span className="text-[12px] bg-white px-2 rounded-full text-green-600">2024/25</span>
                <Icon
                    icon="ri:more-fill"
                    width="26"
                    height="26"
                    className="text-foreground/50"
                />
            </div>
            <h1 className="text-2xl font-semibold my-4">1,234</h1>
            <h2 className="capitalize text-base font-medium text-foreground/60">{type}</h2>
        </div>
    );
};

export default Card;
