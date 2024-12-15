/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/TableData";
import { toast } from "react-toastify";
import { useDataContext } from "@/app/context/AppContext";
// import DeleteDialog from "@/components/shared/DeleteDialog";
import { createBookingColumns } from "@/components/admin/bookingComponent/Column";
import BookingEditForm from "@/components/admin/bookingComponent/BookingEditForm";
import bookingApiRequest from "@/apiRquest/booking";

const BookingPage = () => {
    const {
        bookings,
        setBookings,
        isEditOpen,
        // isDeleteOpen,
        selectedItem,
        openEditModal,
        closeEditModal,
        // openDeleteModal,
        // closeDeleteModal,
        editItem,
        // deleteItem,
    } = useDataContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const handleEditSubmit = (updatedBooking: any) => {
        editItem("bookings", updatedBooking.id, updatedBooking);
        closeEditModal();
        toast.success(`Booking ${updatedBooking.id} updated successfully!`);
    };

    // const handleDelete = () => {
    //     if (selectedItem) {
    //         deleteItem("bookings", selectedItem.id);
    //         closeDeleteModal();
    //         toast.success(
    //             `Booking ${selectedItem.title} has been successfully deleted.`
    //         );
    //     }
    // };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await bookingApiRequest.bookings();
                if (response.status === 200) {
                    setBookings(response.payload.data);
                }
            } catch (error: any) {
                setError(
                    error.message || "An error occurred while fetching tours"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
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

    const columns = createBookingColumns(openEditModal);
    return (
        <div className="w-full overflow-hidden mx-auto py-2">
            <DataTable columns={columns} data={bookings} />

            {/* <DeleteDialog
                isOpen={isDeleteOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                itemName={selectedItem?.id}
                entityName="Bookings"
            /> */}

            {isEditOpen && selectedItem && (
                <BookingEditForm
                    isOpen={isEditOpen}
                    onClose={closeEditModal}
                    onSubmit={handleEditSubmit}
                    initialData={selectedItem}
                />
            )}
        </div>
    );
};

export default BookingPage;
