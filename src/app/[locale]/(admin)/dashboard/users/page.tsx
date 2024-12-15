"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/TableData";
import UserEditForm from "@/components/admin/userComponent/UserEditForm";
import { toast } from "react-toastify";
import { useDataContext } from "@/app/context/AppContext";
import DeleteDialog from "@/components/shared/DeleteDialog";
import { createUserColumns } from "@/components/admin/userComponent/Column";
import userApiRequest from "@/apiRquest/user";

const Users = () => {
    const {
        setUsers,
        users,
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

    const handleEditSubmit = (updatedUser: any) => {
        editItem("users", updatedUser.id, updatedUser);
        closeEditModal();
        toast.success(`User ${updatedUser.title} updated successfully!`);
    };

    const handleDelete = () => {
        if (selectedItem) {
            deleteItem("users", selectedItem.id);
            closeDeleteModal();
            toast.success(
                `User ${selectedItem.title} has been successfully deleted.`
            );
        }
    };

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await userApiRequest.user();

                if (response.status === 200) {
                    setUsers(response.payload.data);
                }
            } catch (error: any) {
                setError(
                    error.message || "An error occurred while fetching tours"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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

    const columns = createUserColumns(openEditModal, openDeleteModal);

    return (
        <div className="w-full mx-auto py-2">
            {/* Data Table */}
            <DataTable columns={columns} data={users} />
            {/* Edit Form */}
            {isEditOpen && selectedItem && (
                <UserEditForm
                    isOpen={isEditOpen}
                    onClose={closeEditModal}
                    onSubmit={handleEditSubmit}
                    initialData={selectedItem}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <DeleteDialog
                isOpen={isDeleteOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                itemName={selectedItem?.title}
                entityName="Destinations"
            />
        </div>
    );
};

export default Users;
