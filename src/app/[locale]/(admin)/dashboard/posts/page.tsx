/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { DataTable } from "@/components/shared/TableData";
import { toast } from "react-toastify";
import { useDataContext } from "@/app/context/AppContext";
import DeleteDialog from "@/components/shared/DeleteDialog";
import PostEditForm from "@/components/admin/postComponent/PostEditForm";
import { createPostColumns } from "@/components/admin/postComponent/Column";

const PostPage = () => {
    const {
        posts,
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

    const handleEditSubmit = (updatedPost: any) => {
        editItem("posts", updatedPost.id, updatedPost);
        closeEditModal();
        toast.success(
            `Post ${updatedPost.title} updated successfully!`
        );
    };

    const handleDelete = () => {
        if (selectedItem) {
            deleteItem("posts", selectedItem.id);
            closeDeleteModal();
            toast.success(
                `Post ${selectedItem.id} has been successfully deleted.`
            );
        }
    };

    const columns = createPostColumns(openEditModal, openDeleteModal);
    return (
        <div className="w-full overflow-hidden mx-auto py-2">
            <DataTable
                columns={columns}
                data={posts}
            />

            <DeleteDialog
                isOpen={isDeleteOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                itemName={selectedItem?.id}
                entityName="Post"
            />

            {isEditOpen && selectedItem && (
                <PostEditForm
                    isOpen={true}
                    onClose={closeEditModal}
                    onSubmit={handleEditSubmit}
                    initialData={selectedItem}
                />
            )}
        </div>
    );
};

export default PostPage;
