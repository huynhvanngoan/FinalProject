/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/TableData";
import { toast } from "react-toastify";
import { useDataContext } from "@/app/context/AppContext";
import DestinationEditForm from "@/components/admin/destinationComponent/DestinationEditForm";
import DeleteDialog from "@/components/shared/DeleteDialog";
import { createDestinationColumns } from "@/components/admin/destinationComponent/Column";
import destinationApiRequest from "@/apiRquest/destination";

const DestinationPage = () => {
    const {
        destinations,
        setDestinations,
        isEditOpen,
        isDeleteOpen,
        selectedItem,
        openEditModal,
        closeEditModal,
        openDeleteModal,
        closeDeleteModal,
        editItem,
        deleteItem,
    } = useDataContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleEditSubmit = (updatedDestination: any) => {
        editItem("destinations", updatedDestination.id, updatedDestination);
        closeEditModal();
        toast.success(
            `Destination ${updatedDestination.title} updated successfully!`
        );
    };

    const handleDelete = () => {
        if (selectedItem) {
            deleteItem("destinations", selectedItem.id);
            closeDeleteModal();
            toast.success(
                `Destination ${selectedItem.title} has been successfully deleted.`
            );
        }
    };
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                setLoading(true);
                const response = await destinationApiRequest.destination();
                if (response.status === 200) {
                    setDestinations(response.payload.data);
                }
            } catch (error: any) {
                setError(
                    error.message || "An error occurred while fetching tours"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
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

    const columns = createDestinationColumns(openEditModal, openDeleteModal);
    return (
        <div className="w-full overflow-hidden mx-auto py-2">
            <DataTable columns={columns} data={destinations} />

            <DeleteDialog
                isOpen={isDeleteOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                itemName={selectedItem?.title}
                entityName="Destinations"
            />

            {isEditOpen && selectedItem && (
                <DestinationEditForm
                    isOpen={isEditOpen}
                    onClose={closeEditModal}
                    onSubmit={handleEditSubmit}
                    initialData={selectedItem}
                />
            )}
        </div>
    );
};

export default DestinationPage;
