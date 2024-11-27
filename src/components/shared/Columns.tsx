/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tour } from "@/types/tours";
import { User } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Actions, { Action } from "./Actions"; // Adjust the import path as needed
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";

// Define the actions for users
const getUserActions = (
    user: User,
    onView?: (user: User) => void,
    onEdit?: (user: User) => void,
    onDelete?: (user: User) => void
): Action<User>[] => [
    {
        name: "view",
        icon: "solar:eye-bold",
        tooltip: "View Details",
        handler: (user) => onView?.(user),
        variant: "primary",
    },
    {
        name: "edit",
        icon: "solar:pen-bold",
        tooltip: "Edit User",
        handler: (user) => onEdit?.(user),
        variant: "primary",
    },
    {
        name: "delete",
        icon: "solar:trash-bin-trash-bold",
        tooltip: "Delete User",
        handler: (user) => onDelete?.(user),
        variant: "destructive",
    },
];

// Define the actions for tours
const getTourActions = (
    tour: Tour,
    onView?: (tour: Tour) => void,
    onEdit?: (tour: Tour) => void,
    onDelete?: (tour: Tour) => void,
    // onFeature?: (tour: Tour) => void // Added feature action for tours
): Action<Tour>[] => [
    {
        name: "view",
        icon: "solar:eye-bold",
        tooltip: "View Tour Details",
        handler: (tour) => onView?.(tour),
        variant: "primary",
    },
    {
        name: "edit",
        icon: "solar:pen-bold",
        tooltip: "Edit Tour",
        handler: (tour) => onEdit?.(tour),
        variant: "primary",
    },
    // {
    //     name: "feature",
    //     icon: "solar:star-bold",
    //     tooltip: "Feature Tour",
    //     handler: (tour) => onFeature?.(tour),
    //     variant: "warning",
    // },
    {
        name: "delete",
        icon: "solar:trash-bin-trash-bold",
        tooltip: "Delete Tour",
        handler: (tour) => onDelete?.(tour),
        variant: "destructive",
    },
];

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: "profilePic",
        header: "Avatar",
        size: 100,
        cell: ({ row }: { row: any }) => {
            return (
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={row.getValue("profilePic") || "/placeholder.png"}
                        alt={`${row.getValue("first_name")} avatar`}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                        {row.getValue("first_name")?.[0]}
                        {row.getValue("last_name")?.[0]}
                    </AvatarFallback>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        size: 170,
        enableGlobalFilter: true,
        enableSorting: true,
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "first_name",
        header: "First Name",
        size: 100,
        enableGlobalFilter: true,
        enableSorting: true,
        cell: ({ row }) => (
            <div className="font-medium text-sm">
                {row.getValue("first_name")}
            </div>
        ),
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
        size: 100,
        enableGlobalFilter: true,
        enableSorting: true,
        cell: ({ row }) => (
            <div className="font-medium text-sm">
                {row.getValue("last_name")}
            </div>
        ),
    },
    {
        accessorKey: "bio",
        header: "Bio",
        size: 200,
        enableSorting: true,
        enableGlobalFilter: true,
        cell: ({ row }) => {
            const bio = row.getValue("bio") as string;
            return (
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                                {bio}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px] whitespace-normal">
                            <p>{bio}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        size: 125,
        enableSorting: false,
        cell: ({ row }) => {
            const actions = getUserActions(
                row.original,
                (user) => {
                    console.log("View user:", user);
                    // Implement view logic
                },
                (user) => {
                    console.log("Edit user:", user);
                    // Implement edit logic
                },
                (user) => {
                    console.log("Delete user:", user);
                    // Implement delete logic
                }
            );

            return <Actions item={row.original} actions={actions} />;
        },
    },
];

// export const tourColumns: ColumnDef<Tour>[] = [
//     {
//         accessorKey: "thumbnails",
//         header: "Thumbnail",
//         cell: ({ row }) => {
//             const thumbnails = row.getValue("thumbnails") as string[];
//             const firstThumbnail = thumbnails?.[0] || "/placeholder.png";

//             return (
//                 <div className="h-16 w-16 relative rounded-lg overflow-hidden">
//                     <Image
//                         fill
//                         src={firstThumbnail}
//                         alt="Tour thumbnail"
//                         className="object-cover h-full w-full"
//                     />
//                 </div>
//             );
//         },
//     },
//     {
//         accessorKey: "title",
//         header: "Title",
//         cell: ({ row }) => (
//             <div className="font-medium text-sm">{row.getValue("title")}</div>
//         ),
//     },
//     {
//         accessorKey: "location",
//         header: "Location",
//         cell: ({ row }) => (
//             <div className="text-sm">{row.getValue("location")}</div>
//         ),
//     },
//     {
//         accessorKey: "price",
//         header: "Price",
//         cell: ({ row }) => (
//             <div className="text-sm font-medium">
//                 ${Number(row.getValue("price")).toLocaleString()}
//             </div>
//         ),
//     },
//     {
//         accessorKey: "startDate",
//         header: "Start Date",
//         cell: ({ row }) => (
//             <div className="text-sm">
//                 {new Date(row.getValue("startDate")).toLocaleDateString()}
//             </div>
//         ),
//     },
//     {
//         accessorKey: "duration",
//         header: "Duration",
//         cell: ({ row }) => (
//             <div className="text-sm">{row.getValue("duration")} days</div>
//         ),
//     },
//     {
//         accessorKey: "rating",
//         header: "Rating",
//         cell: ({ row }) => (
//             <div className="flex items-center gap-1">
//                 <span className="text-sm">{row.getValue("rating")}</span>
//                 <span className="text-yellow-500">★</span>
//             </div>
//         ),
//     },
//     {
//         accessorKey: "description",
//         header: "Description",
//         cell: ({ row }) => {
//             const description = row.getValue("description") as string;
//             return (
//                 <TooltipProvider delayDuration={300}>
//                     <Tooltip>
//                         <TooltipTrigger asChild>
//                             <div className="max-w-[300px] truncate text-sm text-muted-foreground">
//                                 {description}
//                             </div>
//                         </TooltipTrigger>
//                         <TooltipContent className="max-w-[300px] whitespace-normal">
//                             <p>{description}</p>
//                         </TooltipContent>
//                     </Tooltip>
//                 </TooltipProvider>
//             );
//         },
//     },
//     {
//         id: "actions",
//         header: "Actions",
//         cell: ({ row }) => {
//             const actions = getTourActions(
//                 row.original,
//                 (tour) => {
//                     console.log("View tour:", tour);
//                     // Implement view logic
//                 },
//                 (tour) => {
//                     console.log("Edit tour:", tour);
//                     // Implement edit logic
//                 },
//                 (tour) => {
//                     console.log("Delete tour:", tour);
//                     // Implement delete logic
//                 },
//                 (tour) => {
//                     console.log("Feature tour:", tour);
//                     // Implement feature logic
//                 }
//             );

//             return <Actions item={row.original} actions={actions} />;
//         },
//     },
// ];

export const tourColumns: ColumnDef<Tour>[] = [
    {
        accessorKey: "thumbnails",
        header: "Thumbnail",
        cell: ({ row }) => {
            const thumbnails = row.getValue("thumbnails") as string[];
            const firstThumbnail = thumbnails?.[0] || "/placeholder.png";

            return (
                <div className="h-16 w-16 relative rounded-lg overflow-hidden">
                    <Image
                        fill
                        src={firstThumbnail}
                        alt="Tour thumbnail"
                        className="object-cover h-full w-full"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "photo",
        header: "Photo",
        cell: ({ row }) => {
            const photo = row.getValue("photo") as string;
            return photo ? (
                <div className="h-16 w-16 relative rounded-lg overflow-hidden">
                    <Image
                        fill
                        src={photo}
                        alt="Tour photo"
                        className="object-cover h-full w-full"
                    />
                </div>
            ) : (
                <div className="text-muted-foreground">No photo</div>
            );
        },
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
            <div className="text-sm">{row.getValue("duration")} days</div>
        ),
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <span className="text-sm">{row.getValue("rating")}</span>
                <span className="text-yellow-500">★</span>
            </div>
        ),
    },
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
        accessorKey: "typeId",
        header: "Tour Type ID",
        cell: ({ row }) => (
            <div className="text-sm">{row.getValue("typeId")}</div>
        ),
    },
    {
        accessorKey: "packageId",
        header: "Package ID",
        cell: ({ row }) => (
            <div className="text-sm">{row.getValue("packageId")}</div>
        ),
    },
    {
        accessorKey: "destinationId",
        header: "Destination ID",
        cell: ({ row }) => (
            <div className="text-sm">{row.getValue("destinationId")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
            <div className="text-sm">
                {new Date(row.getValue("createdAt")).toLocaleString()}
            </div>
        ),
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => (
            <div className="text-sm">
                {new Date(row.getValue("updatedAt")).toLocaleString()}
            </div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const actions = getTourActions(
                row.original,
                (tour) => {
                    console.log("View tour:", tour);
                    // Implement view logic
                },
                (tour) => {
                    console.log("Edit tour:", tour);
                    // Implement edit logic
                },
                (tour) => {
                    console.log("Delete tour:", tour);
                    // Implement delete logic
                },
                // (tour) => {
                //     console.log("Feature tour:", tour);
                //     // Implement feature logic
                // }
            );

            return <Actions item={row.original} actions={actions} />;
        },
    },
];