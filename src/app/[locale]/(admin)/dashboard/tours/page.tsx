"use client";
import tourApiRequest from "@/apiRquest/tour";
import { useDataContext } from "@/app/context/AppContext";
import { createTourColumns } from "@/components/admin/tourComponent/Column";
import TourEditForm from "@/components/admin/tourComponent/TourEditForm";
import DeleteDialog from "@/components/shared/DeleteDialog";
import { DataTable } from "@/components/shared/TableData";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Tours = () => {
    const {
        tours,
        setTours,
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

    const handleEditSubmit = async (updatedTour: any) => {
        try {
            const response = await tourApiRequest.edit(
                updatedTour.id,
                updatedTour
            );
            if (response.status === 200) {
                editItem(
                    "tours",
                    response.payload.data.id,
                    response.payload.data
                );
                closeEditModal();
                toast.success(
                    `Destination ${updatedTour.title} updated successfully!`
                );
            }
        } catch (error) {
            console.error("Error updating tour:", error);
        }
    };

    const handleDelete = async  () => {
        if (selectedItem) {
            const  response = await tourApiRequest.delete(selectedItem.id)
            if(response.status === 200) {

                deleteItem("tours", selectedItem.id);
                closeDeleteModal();
                toast.success(
                    `Tour ${selectedItem.title} has been successfully deleted.`
                );
            }
        }
    };
    // const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                setLoading(true);
                const response = await tourApiRequest.tour();

                if (response.status === 200) {
                    setTours(response.payload.data);
                }
            } catch (error: any) {
                setError(
                    error.message || "An error occurred while fetching tours"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);
    console.log(tours)

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

    const columns = createTourColumns(openEditModal, openDeleteModal);
    return (
        <div className="w-full overflow-hidden mx-auto py-2 ">
            <DataTable columns={columns} data={tours} />
            <DeleteDialog
                isOpen={isDeleteOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                itemName={selectedItem?.title}
                entityName="Tours"
            />
            {isEditOpen && selectedItem && (
                <TourEditForm
                    isOpen={isEditOpen}
                    onClose={closeEditModal}
                    onSubmit={handleEditSubmit}
                    initialData={selectedItem}
                />
            )}
        </div>
    );
};

export default Tours;
