/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ColumnsDropdown from "./ColumnsDropdown";
import SearchInput from "./SearchInput";
import UserAddForm from "../admin/userComponent/UserAddForm";
import DestinationAddForm from "../admin/destinationComponent/DestinationAddForm";
import { useDataContext } from "@/app/context/AppContext";
import { toast } from "react-toastify";
import TourAddForm from "../admin/tourComponent/TourAddForm";
import PostAddForm from "../admin/postComponent/PostAddForm";
import tourApiRequest from "@/apiRquest/tour";
const TableToolbar = ({
    globalFilter,
    setGlobalFilter,
    table,
}: {
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    table: any;
}) => {
    const { addItem } = useDataContext();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const pathname = usePathname();
    const path = pathname.split("/").pop();

    const handleSubmit = async (formData: any) => {
        if (path) {
            if (path === "tours") {
                const res = await tourApiRequest.create(formData);
                if (res.status === 201) { 
                    const newTour = res.payload.data;
                    addItem(path, newTour);
                }
            }

        }
        setIsPopupOpen(false);
    };

    const getFormConfig = () => {
        switch (path) {
            case "users":
                return {
                    title: "Add New User",
                    buttonTitle: "Add New User",
                    form: (
                        <UserAddForm
                            isOpen={isPopupOpen}
                            onClose={() => setIsPopupOpen(false)}
                            onSubmit={handleSubmit}
                        />
                    ),
                };
            case "tours":
                return {
                    title: "Add New Tour",
                    buttonTitle: "Add New Tour",
                    form: (
                        <TourAddForm
                            isOpen={isPopupOpen}
                            onClose={() => setIsPopupOpen(false)}
                            onSubmit={handleSubmit}
                        />
                    ),
                };
            case "posts":
                return {
                    title: "Add New Post",
                    buttonTitle: "Add New Post",
                    form: (
                        <PostAddForm
                            isOpen={isPopupOpen}
                            onClose={() => setIsPopupOpen(false)}
                            onSubmit={handleSubmit}
                        />
                    ),
                };
            case "destinations":
                return {
                    title: "Add New Destination",
                    buttonTitle: "Add New Destination",
                    form: (
                        <DestinationAddForm
                            isOpen={isPopupOpen}
                            onClose={() => setIsPopupOpen(false)}
                            onSubmit={handleSubmit}
                        />
                    ),
                };
            default:
                return {
                    title: "Add New Item",
                    buttonTitle: "Add New",
                    form: null,
                };
        }
    };

    const { title, buttonTitle, form } = getFormConfig();

    return (
        <>
            <div className="p-4 flex items-center gap-2 border-b">
                <SearchInput value={globalFilter} onChange={setGlobalFilter} />
                <ColumnsDropdown table={table} />
                {path !== "bookings" && (
                    <Button onClick={() => setIsPopupOpen(true)}>
                        {buttonTitle}
                    </Button>
                )}
            </div>

            {isPopupOpen && form}
        </>
    );
};

export default TableToolbar;
