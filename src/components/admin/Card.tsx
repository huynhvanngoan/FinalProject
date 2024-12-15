"use client";

import React from "react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

const DATA_CONFIGS = {
    users: {
        icon: "ri:user-line",

        color: "text-green-600",
    },
    reviews: {
        icon: "ri:star-line",

        color: "text-purple-600",
    },
    bookings: {
        icon: "ri:calendar-line",

        color: "text-blue-600",
    },
    revenue: {
        icon: "ri:money-dollar-circle-line",

        color: "text-emerald-600",
    },
};

// Format number for better readability
const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
};

// Get the current date in "YYYY/MM/DD" format
const getCurrentDate = () => {
    const now = new Date();
    return `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(
        2,
        "0"
    )}/${String(now.getDate()).padStart(2, "0")}`;
};

interface CardProps {
    type: string;
    value?: any;
}

const Card: React.FC<CardProps> = ({ type, value }) => {
    // const [localValue, setLocalValue] = useState(0);

    const config =
        DATA_CONFIGS[type.toLowerCase() as keyof typeof DATA_CONFIGS] ||
        DATA_CONFIGS.users;

    return (
        <div
            className={`rounded-2xl odd:bg-primary even:bg-[#CFCEFF]/40 p-4 flex-1 min-w-[130px]`}
        >
            <div className="flex justify-between items-center">
                <span className="text-[12px] bg-white px-2 rounded-full text-green-600">
                    {getCurrentDate()}
                </span>
                <Icon
                    icon="ri:more-fill"
                    width="26"
                    height="26"
                    className="text-foreground/50"
                />
            </div>
            <h1 className="text-2xl font-semibold my-4">
                {type === "revenue"
                    ? `$${formatNumber(value)}`
                    : formatNumber(value)}
            </h1>
            <div className="flex items-center gap-2">
                <Icon
                    icon={config.icon}
                    width="20"
                    height="20"
                    className={`${config.color}`}
                />
                <h2 className="capitalize text-base font-medium text-foreground/60">
                    {type}
                </h2>
            </div>
        </div>
    );
};

// Disable SSR for this component
export default dynamic(() => Promise.resolve(Card), { ssr: false });
