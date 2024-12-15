"use client";
import dashboardApiRequest from "@/apiRquest/dashboard";
import { useDataContext } from "@/app/context/AppContext";
import Card from "@/components/admin/Card";
import CountChart from "@/components/admin/CountChart";
// import Revenue from "@/components/admin/Revenue";
import TourBookingCustomerChart from "@/components/admin/TourBookingCustomerChart";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const { statisticOverview, setStatisticOverview } = useDataContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                setLoading(true);
                const response = await dashboardApiRequest.overview();

                if (response.status === 200) {
                    // Update statisticOverview with data from API
                    setStatisticOverview(response.payload.data);
                }
            } catch (error: any) {
                setError(
                    error.message || "An error occurred while fetching overview"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, []);

    if (loading) {
        return (
            <section className="flex justify-center items-center h-full">
                <p>Loading tours...</p>
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
        <div className="flex gap-4 md:flex-row pb-8">
            <div className=" flex flex-col gap-8">
                <div className="flex gap-4 justify-between flex-wrap">
                <Card
                        type="users"
                        value={statisticOverview.users}
                    />
                    <Card
                        type="reviews"
                        value={statisticOverview.reviews} 
                    />
                    <Card
                        type="bookings"
                        value={statisticOverview.bookings}
                    />
                    <Card
                        type="revenue"
                        value={statisticOverview.revenue}
                    />
                </div>
                <div className="flex gap-4 flex-col xxl:flex-row">
                    <div className="w-full xxl:w-1/3 h-[750px]">
                        <CountChart />
                    </div>
                    <div className="w-full xxl:w-2/3 h-[750px] ">
                        <TourBookingCustomerChart />
                    </div>
                </div>
                {/* <div className="w-full h-[600px]">
                    <Revenue />
                </div> */}
            </div>
            {/* <div className="w-full lg:w-1/3">r</div> */}
        </div>
    );
};

export default Dashboard;
