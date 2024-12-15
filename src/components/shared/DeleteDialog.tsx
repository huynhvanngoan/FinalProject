/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (destinationId: any) => void;
    itemName?: string;
    entityName?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName = "this item",
    entityName = "",
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>
                    Are you sure you want to delete <strong>{itemName}</strong>
                    {entityName ? ` from ${entityName}` : ""}?
                </p>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;
