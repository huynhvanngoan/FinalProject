import Card from "@/components/admin/Card";
import CountChart from "@/components/admin/CountChart";
import React from "react";

const Dashboard = () => {
    return (
        <div className="size-full p-4 flex gap-4 md:flex-row">
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                <div className="flex gap-4 justify-between flex-wrap">
                    <Card type="users" />
                    <Card type="Reviews" />
                    <Card type="bookings" />
                    <Card type="Revenue" />
                </div>
                <div className="flex gap-4 flex-col lg:flex-row">
                    <div className="w-full lh:w-1/3 h-[450px]">
                        <CountChart />
                    </div>
                    <div className="w-full lh:w-2/3 h-[450px]"></div>
                </div>
                <div className=""></div>
            </div>
            <div className="w-full lg:w-1/3">r</div>
        </div>
    );
};

export default Dashboard;
