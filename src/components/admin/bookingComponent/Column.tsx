/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import Actions from "@/components/tableColumn/Actions";
import { AdminBooking } from "@/types/booking";

export const createBookingColumns = (
    onEdit: (item: AdminBooking) => void,
    // onDelete: (item: AdminBooking) => void
): ColumnDef<AdminBooking>[] => [
    {
        accessorKey: "id",
        header: "Booking ID",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "tourId",
        header: "Tour ID",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("tourId")}</div>
        ),
    },
    {
        accessorKey: "userId",
        header: "User ID",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("userId")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as unknown;

            // Validate or cast 'status' to a string
            if (typeof status !== "string") {
                return (
                    <div className="font-medium text-sm text-gray-500">
                        Unknown
                    </div>
                );
            }

            // Apply styles based on the status value
            const statusClass =
                status === "confirmed"
                    ? "text-green-600"
                    : status === "pending"
                    ? "text-yellow-600"
                    : status === "canceled"
                    ? "text-red-600"
                    : "text-gray-500";

            return (
                <div className={`font-medium text-sm ${statusClass}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <Actions
                item={row.original}
                actions={[
                    {
                        name: "edit",
                        icon: "solar:pen-bold",
                        tooltip: "Edit Booking",
                        handler: () => onEdit(row.original),
                        variant: "primary",
                    },
                    // {
                    //     name: "delete",
                    //     icon: "solar:trash-bin-trash-bold",
                    //     tooltip: "Delete Booking",
                    //     handler: () => onDelete(row.original),
                    //     variant: "destructive",
                    // },
                ]}
            />
        ),
    },
];
