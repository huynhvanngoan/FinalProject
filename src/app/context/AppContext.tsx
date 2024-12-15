/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AdminBooking } from "@/types/booking";
import { Destination } from "@/types/destination";
import { Post } from "@/types/post";
import { StatisticOverview, TourTypeDistribution } from "@/types/statistic";
import { Tour } from "@/types/tours";
import { User } from "@/types/users";
import React, { createContext, useContext, useState } from "react";

// Define types for each entity
type DataContextType = {
    users: User[];
    tours: Tour[];
    setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
    setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    bookings: AdminBooking[];
    setBookings: React.Dispatch<React.SetStateAction<AdminBooking[]>>;
    posts: Post[];
    destinations: Destination[];
    statisticOverview: StatisticOverview; // New state for statistics
    setStatisticOverview: React.Dispatch<
        React.SetStateAction<StatisticOverview>
    >;
    tourTypeDistribution: TourTypeDistribution; // New state
    setTourTypeDistribution: React.Dispatch<
        React.SetStateAction<TourTypeDistribution>
    >;
    isEditOpen: boolean;
    isDeleteOpen: boolean;
    selectedItem: any | null;
    openEditModal: (item: any) => void;
    closeEditModal: () => void;
    openDeleteModal: (item: any) => void;
    closeDeleteModal: () => void;
    addItem: <T>(entity: string, newItem: T) => void;
    editItem: <T>(entity: string, id: number, updatedItem: Partial<T>) => void;
    deleteItem: (entity: string, id: number) => void;
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create the provider
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [tours, setTours] = useState<Tour[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [bookings, setBookings] = useState<AdminBooking[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [statisticOverview, setStatisticOverview] =
        useState<StatisticOverview>({
            reviews: 0,
            bookings: 0,
            users: 0,
            revenue: 0,
        });
    const [tourTypeDistribution, setTourTypeDistribution] =
        useState<TourTypeDistribution>([]);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    // Open and close modals
    const openEditModal = (item: any) => {
        setSelectedItem(item);
        setEditOpen(true);
    };

    const closeEditModal = () => {
        setSelectedItem(null);
        setEditOpen(false);
    };

    const openDeleteModal = (item: any) => {
        setSelectedItem(item);
        setDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedItem(null);
        setDeleteOpen(false);
    };

    // Generic add function
    const addItem = <T,>(entity: string, newItem: T) => {
        switch (entity) {
            case "users":
                setUsers((prev) => [...prev, newItem as User]);
                break;
            case "tours":
                setTours((prev) => [...prev, newItem as Tour]);
                break;
            case "posts":
                setPosts((prev) => [...prev, newItem as Post]);
                break;
            case "destinations":
                setDestinations((prev) => [...prev, newItem as Destination]);
                break;
            case "bookings":
                setBookings((prev) => [...prev, newItem as AdminBooking]);
                break;
            default:
                throw new Error(`Unknown entity: ${entity}`);
        }
    };

    // Generic edit function
    const editItem = <T,>(
        entity: string,
        id: number,
        updatedItem: Partial<T>
    ) => {
        const update = (items: any[]) =>
            items.map((item) =>
                item.id === id ? { ...item, ...updatedItem } : item
            );

        switch (entity) {
            case "users":
                setUsers((prev) => update(prev));
                break;
            case "tours":
                setTours((prev) => update(prev));
                break;
            case "posts":
                setPosts((prev) => update(prev));
                break;
            case "destinations":
                setDestinations((prev) => update(prev));
                break;
            case "bookings":
                setBookings((prev) => update(prev));
                break;
            default:
                throw new Error(`Unknown entity: ${entity}`);
        }
    };

    // Generic delete function
    const deleteItem = (entity: string, id: number) => {
        const remove = (items: any[]) => items.filter((item) => item.id !== id);

        switch (entity) {
            case "users":
                setUsers((prev) => remove(prev));
                break;
            case "tours":
                setTours((prev) => remove(prev));
                break;
            case "posts":
                setPosts((prev) => remove(prev));
                break;
            case "destinations":
                setDestinations((prev) => remove(prev));
                break;
            case "bookings":
                setBookings((prev) => remove(prev));
                break;
            default:
                throw new Error(`Unknown entity: ${entity}`);
        }
    };

    return (
        <DataContext.Provider
            value={{
                users,
                setUsers,
                tours,
                setTours,
                posts,
                bookings,
                setBookings,
                destinations,
                setDestinations,
                statisticOverview,
                setStatisticOverview,
                tourTypeDistribution,
                setTourTypeDistribution,
                isEditOpen,
                isDeleteOpen,
                selectedItem,
                openEditModal,
                closeEditModal,
                openDeleteModal,
                closeDeleteModal,
                addItem,
                editItem,
                deleteItem,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

// Custom hook for consuming the context
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
};
