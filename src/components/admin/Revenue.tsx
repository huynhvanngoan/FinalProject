import React from "react";
import { Icon } from "@iconify/react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const generateTourBookingData = () => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return months.map((month) => ({
        name: month,
        individualTours: Math.floor(Math.random() * 50000) + 10000,
        groupTours: Math.floor(Math.random() * 75000) + 20000,
    }));
};

const Revenue = () => {
    const data = generateTourBookingData();
    return (
        <div className="bg-popover rounded-xl size-full p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Tour Booking Revenue</h1>
                <Icon
                    icon="ri:more-fill"
                    width="32"
                    height="32"
                    className="text-foreground/50"
                />
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tick={{ fill: "#d1d5db" }}
                        tickLine={false}
                        tickMargin={10}
                    />
                    <YAxis
                        axisLine={false}
                        tick={{ fill: "#d1d5db" }}
                        tickLine={false}
                        tickMargin={10}
                    />
                    <Tooltip contentStyle={{ borderRadius: "10px" }} />
                    <Legend
                        align="left"
                        verticalAlign="top"
                        wrapperStyle={{
                            paddingTop: "20px",
                            paddingBottom: "40px",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="individualTours"
                        name="Individual Tours"
                        stroke="#8884d8"
                        // activeDot={{ r: 8 }}
                        strokeWidth={5}
                    />
                    <Line
                        type="monotone"
                        dataKey="groupTours"
                        name="Group Tours"
                        stroke="#82ca9d"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Revenue;
