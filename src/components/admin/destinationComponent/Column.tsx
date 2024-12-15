/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import { Destination } from "@/types/destination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Actions from "@/components/tableColumn/Actions";

export const createDestinationColumns = (
    onEdit: (item: Destination) => void,
    onDelete: (item: Destination) => void
): ColumnDef<Destination>[] => [
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }: { row: any }) => (
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={row.getValue("image") || "/placeholder.png"}
                    alt={`${row.getValue("title")} avatar`}
                    className="object-cover"
                />
                <AvatarFallback className="bg-primary/10 text-primary">
                    {row.getValue("title")?.[0]}
                </AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="font-medium text-sm">
                {row.getValue("description")}
            </div>
        ),
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
                        tooltip: "Edit Destination",
                        handler: () => onEdit(row.original),
                        variant: "primary",
                    },
                    {
                        name: "delete",
                        icon: "solar:trash-bin-trash-bold",
                        tooltip: "Delete Destination",
                        handler: () => onDelete(row.original),
                        variant: "destructive",
                    },
                ]}
            />
        ),
    },
];
