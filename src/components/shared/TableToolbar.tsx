/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ColumnsDropdown from "./ColumnsDropdown";
import SearchInput from "./SearchInput";
import PopupForm from "./PopupForm";
import { tourFields, userFields } from "@/types/formfields";

const TableToolbar = ({
    globalFilter,
    setGlobalFilter,
    table,
}: {
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    table: any;
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const pathname = usePathname();

    const getFormConfig = () => {
        // Extract the last segment of the pathname
        const path = pathname.split("/").pop();

        switch (path) {
            case "users":
                return {
                    fields: userFields,
                    title: "Add New User",
                    buttonTitle: "Add New User",
                };
            case "tours":
                return {
                    fields: tourFields,
                    title: "Add New Tour",
                    buttonTitle: "Add New Tour",
                };
            default:
                return {
                    fields: [],
                    title: "Add New Item",
                    buttonTitle: "Add New",
                };
        }
    };

    const handleSubmit = (formData: any, mode: "add" | "edit") => {
        // Handle form submission based on pathname
        const path = pathname.split("/").pop();
        console.log(`Submitting ${path} data:`, formData, "Mode:", mode);
        // Add your API call or state update logic here
    };

    const { fields, title, buttonTitle } = getFormConfig();

    return (
        <>
            <div className="p-4 flex items-center gap-2 border-b">
                <SearchInput value={globalFilter} onChange={setGlobalFilter} />
                <ColumnsDropdown table={table} />
                <Button onClick={() => setIsPopupOpen(true)}>
                    {buttonTitle}
                </Button>
            </div>

            <PopupForm
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleSubmit}
                fields={fields}
                title={title}
                mode="add"
            />
        </>
    );
};

export default TableToolbar;
