// src/components/admin/tourComponent/tourColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Image from "next/image";
import Actions from "@/components/tableColumn/Actions";
import { Tour } from "@/types/tours";

export const createTourColumns = (
    onEdit: (tour: Tour) => void,
    onDelete: (tour: Tour) => void
): ColumnDef<Tour>[] => [
    {
        accessorKey: "photo",
        header: "Photo",
        cell: ({ row }: { row: any }) => (
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={row.getValue("photo") || "/placeholder.png"}
                    alt={`${row.getValue("title")} photo`}
                    className="object-cover"
                />
                <AvatarFallback>{row.getValue("title")?.[0]}</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <div className="text-sm">{row.getValue("location")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
            <div className="text-sm font-medium">
                ${Number(row.getValue("price")).toLocaleString()}
            </div>
        ),
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (
            <div className="text-sm">
                {new Date(row.getValue("startDate")).toLocaleDateString()}
            </div>
        ),
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => (
            <div className="text-sm">{row.getValue("duration")}</div>
        ),
    },
    // {
    //     accessorKey: "rating",
    //     header: "Rating",
    //     cell: ({ row }) => (
    //         <div className="flex items-center gap-1">
    //             <span className="text-sm">{row.getValue("rating")}</span>
    //             <span className="text-yellow-500">★</span>
    //         </div>
    //     ),
    // },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const description = row.getValue("description") as string;
            return (
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="max-w-[300px] truncate text-sm text-muted-foreground">
                                {description}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px] whitespace-normal">
                            <p>{description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <div className="text-sm">{row.original.type?.name}</div>
        ),
    },
    {
        accessorKey: "destination",
        header: "Destination",
        cell: ({ row }) => (
            <div className="text-sm">{row.original.destination?.name}</div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const actions = [
                {
                    name: "edit",
                    icon: "solar:pen-bold",
                    tooltip: "Edit Tour",
                    handler: () => onEdit(row.original),
                    variant: "primary",
                },
                {
                    name: "delete",
                    icon: "solar:trash-bin-trash-bold",
                    tooltip: "Delete Tour",
                    handler: () => onDelete(row.original),
                    variant: "destructive",
                },
            ];
            return <Actions item={row.original} actions={actions} />;
        },
    },
];
