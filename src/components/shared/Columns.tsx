/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tour } from "@/types/tours";
import { User } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Destination } from "@/types/destination";
import { Booking } from "@/types/booking";
import { toast } from "react-toastify";

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "location",
    header: "Location",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.getValue("location")}</span>
    ),
  },
  {
    accessorKey: "number_of_travelers",
    header: "Number of Travelers",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("number_of_travelers")}</span>
    ),
  },
  {
    accessorKey: "tour_type",
    header: "Tour Type",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("tour_type")}</span>
    ),
  },
  {
    accessorKey: "travel_class",
    header: "Travel Class",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("travel_class")}</span>
    ),
  },
  {
    accessorKey: "checkin_date",
    header: "Check-In Date",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">
        {new Date(row.getValue("checkin_date")).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "checkout_date",
    header: "Check-Out Date",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">
        {new Date(row.getValue("checkout_date")).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.getValue("full_name")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => <span className="text-sm">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("phone_number")}</span>
    ),
  },
  {
    accessorKey: "passport_number",
    header: "Passport Number",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("passport_number")}</span>
    ),
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("nationality")}</span>
    ),
  },
  {
    accessorKey: "dietary_restrictions",
    header: "Dietary Restrictions",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">
        {row.getValue("dietary_restrictions") || "None"}
      </span>
    ),
  },
  {
    accessorKey: "emergency_name",
    header: "Emergency Contact Name",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("emergency_name")}</span>
    ),
  },
  {
    accessorKey: "emergency_phone",
    header: "Emergency Contact Phone",
    enableGlobalFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("emergency_phone")}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => console.log("View booking:", row.original)}
        >
          View
        </button>
        <button
          className="text-green-500 hover:underline"
          onClick={() => console.log("Edit booking:", row.original)}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => console.log("Delete booking:", row.original)}
        >
          Delete
        </button>
      </div>
    ),
  },
];
