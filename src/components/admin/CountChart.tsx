/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import dynamic from "next/dynamic";
import dashboardApiRequest from "@/apiRquest/dashboard";

// Fixed color palette for tour types
const TOUR_TYPE_COLORS: Record<string, string> = {
    Adventure: "#ff6b6b",
    Cultural: "#ffcc29",
    Luxury: "#4dd599",
    Family: "#1f77b4",
    Nature: "#2ca02c",
    Historical: "#9467bd",
    Romantic: "#ff7f0e",
    Wellness: "#d62728",
};

// Tour type card component
const TourTypeCard = ({
    label,
    count,
    color,
    percentage,
}: {
    label: string;
    count: number;
    color: string;
    percentage: string;
}) => (
    <div className="flex flex-col gap-1 items-center">
        <div
            className="size-5 rounded-full"
            style={{ backgroundColor: color }}
        ></div>
        <h1 className="font-bold">{count.toLocaleString()}</h1>
        <h2 className="text-xs">
            {label} ({percentage}%)
        </h2>
    </div>
);

const CountChart = () => {
    const [data, setData] = useState<
        { name: string; count: number; percentage: string; fill: string }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                setLoading(true);
                const response =
                    await dashboardApiRequest.tourTypeDistribution();

                if (response.status === 200 && response.payload.data) {
                    const totalTours = response.payload.data.reduce(
                        (sum: number, item: { count: number }) =>
                            sum + item.count,
                        0
                    );

                    const formattedData = response.payload.data.map(
                        (item: any) => ({
                            ...item,
                            percentage:
                                totalTours > 0
                                    ? ((item.count / totalTours) * 100).toFixed(
                                          1
                                      ) // Calculate percentage
                                    : "0.0", // Handle case where totalTours is 0
                            fill: TOUR_TYPE_COLORS[item.name] || "#cccccc", // Use fixed color or fallback
                        })
                    );

                    setData(formattedData);
                }
            } catch (error: any) {
                setError("Failed to load tour type distribution.");
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, []);

    if (loading) {
        return (
            <section className="flex justify-center items-center h-full">
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex justify-center items-center h-full">
                <p className="text-red-500">{error}</p>
            </section>
        );
    }

    return (
        <div className="bg-popover rounded-xl size-full p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">
                    Tour Type Distribution
                </h1>
                <Icon
                    icon="ri:more-fill"
                    width="32"
                    height="32"
                    className="text-foreground/50"
                />
            </div>
            <div className="w-full flex-grow">
                <ResponsiveContainer width="100%" height="75%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="10%"
                        outerRadius="100%"
                        barSize={20}
                        data={data}
                    >
                        <RadialBar
                            label={{ position: "insideStart", fill: "#fff" }}
                            background
                            dataKey="count"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center flex-wrap gap-4">
                {data.map((tourType) => (
                    <TourTypeCard
                        key={tourType.name}
                        label={tourType.name}
                        count={tourType.count}
                        color={tourType.fill}
                        percentage={tourType.percentage}
                    />
                ))}
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(CountChart), { ssr: false });
