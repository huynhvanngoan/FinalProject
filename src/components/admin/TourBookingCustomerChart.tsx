/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import dashboardApiRequest from "@/apiRquest/dashboard";

const data = [
    {
        name: "January",
        customers: 15500,
        revenue: 120000, // in USD
    },
    {
        name: "February",
        customers: 21800,
        revenue: 145000,
    },
    {
        name: "March",
        customers: 22200,
        revenue: 175000,
    },
    {
        name: "April",
        customers: 32500,
        revenue: 200000,
    },
    {
        name: "May",
        customers: 23000,
        revenue: 250000,
    },
    {
        name: "June",
        customers: 44000,
        revenue: 320000,
    },
    {
        name: "July",
        customers: 44500,
        revenue: 380000,
    },
    {
        name: "August",
        customers: 55000,
        revenue: 420000,
    },
    {
        name: "September",
        customers: 24200,
        revenue: 360000,
    },
    {
        name: "October",
        customers: 23800,
        revenue: 310000,
    },
    {
        name: "November",
        customers: 63100,
        revenue: 240000,
    },
    {
        name: "December",
        customers: 73500,
        revenue: 270000,
    },
];

const TourBookingCustomerChart = () => {
    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const response = await dashboardApiRequest.bookingRevenue();

                if (response.status === 200) {
                    console.log(response);
                }
            } catch (error: any) {
                throw new Error("An error occurred while fetching overview");
            }
        };

        fetchOverview();
    }, []);
    return (
        <div className="bg-popover rounded-lg p-4 size-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">
                    Monthly Customers and Revenue Statistics
                </h1>
                <Icon
                    icon="ri:more-fill"
                    width="32"
                    height="32"
                    className="text-foreground/50"
                />
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart width={500} height={300} data={data} barSize={30}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#ddd"
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tick={{ fill: "#d1d5db" }}
                        tickLine={false}
                    />
                    <YAxis axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "10px" }} />
                    <Legend
                        align="left"
                        verticalAlign="top"
                        wrapperStyle={{
                            paddingTop: "20px",
                            paddingBottom: "40px",
                        }}
                    />
                    <Bar
                        dataKey="revenue"
                        fill="#FAE27C"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                        legendType="circle"
                        radius={[10, 10, 0, 0]}
                    />
                    <Bar
                        dataKey="customers"
                        fill="#C3EBFA"
                        activeBar={<Rectangle fill="gold" stroke="purple" />}
                        legendType="circle"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TourBookingCustomerChart;
