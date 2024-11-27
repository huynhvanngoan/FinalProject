/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import PopupForm from "./PopupForm";
import { tourFields, userFields } from "@/types/formfields";
import { usePathname } from "next/navigation";

// Define Action type
export interface Action<T> {
    name: string;
    icon: string;
    tooltip: string;
    handler: (item: T) => void;
    variant?: string;
}

interface ActionsProps<T> {
    item: T;
    actions: Action<T>[];
}

const Actions = <T extends object>({ item, actions }: ActionsProps<T>) => {
    const [open, setOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [formMode, setFormMode] = useState<"edit" | "view">("view");
    const pathname = usePathname();

    // Get form configuration dynamically based on path and action
    const getFormConfig = (actionName: string) => {
        const path = pathname.split("/").pop();

        switch (path) {
            case "users":
                return {
                    fields: userFields,
                    title: actionName === "edit" ? "Edit User" : "View User",
                };
            case "tours":
                return {
                    fields: tourFields,
                    title: actionName === "edit" ? "Edit Tour" : "View Tour",
                };
            default:
                return {
                    fields: [],
                    title: actionName === "edit" ? "Edit Item" : "Add New Item",
                };
        }
    };

    const handleSubmit = (formData: any, mode: "view" | "edit") => {
        // Handle form submission based on pathname
        const path = pathname.split("/").pop();
        console.log(`Submitting ${path} data:`, formData, "Mode:", mode);
        // Add your API call or state update logic here
    };
    // Handle action execution
    const handleAction = (action: Action<T>) => {
        if (action.name === "delete") {
            setOpen(true); // Open delete dialog
        } else {
            setIsPopupOpen(true);
            const { title, fields } = getFormConfig(action.name);
            setPopupTitle(title);
            setFormMode(
                action.name as "edit" | "view" // Dynamically set form mode
            );
            action.handler(item);
        }
    };

    // Handle delete confirmation
    const handleDelete = (deleteAction: Action<T>) => {
        deleteAction.handler(item);

        // Determine the item type based on the current pathname
        const path = pathname.split("/").pop();
        const itemType =
            path === "users" ? "User" : path === "tours" ? "Tour" : "Item";

        // Show success toast
        toast.success(`${itemType} deleted successfully`);

        setOpen(false);
    };

    return (
        <div className="flex items-center gap-2">
            {actions.map((action, index) => (
                <TooltipProvider delayDuration={300} key={index}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {action.name === "delete" ? (
                                <AlertDialog open={open} onOpenChange={setOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={`hover:bg-${
                                                action.variant || "primary"
                                            }/10 hover:text-${
                                                action.variant || "primary"
                                            }`}
                                        >
                                            <Icon
                                                icon={action.icon}
                                                className="h-4 w-4"
                                            />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Delete Item
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete
                                                this item? This action cannot be
                                                undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    handleDelete(action)
                                                }
                                                className="bg-destructive hover:bg-destructive/90"
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`hover:bg-${
                                        action.variant || "primary"
                                    }/10 hover:text-${
                                        action.variant || "primary"
                                    }`}
                                    onClick={() => handleAction(action)}
                                >
                                    <Icon
                                        icon={action.icon}
                                        className="h-4 w-4"
                                    />
                                </Button>
                            )}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{action.tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
            {isPopupOpen && (
                <PopupForm
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    fields={getFormConfig("").fields}
                    onSubmit={(data) => handleSubmit(data, formMode)}
                    title={popupTitle}
                    // onEdit={formMode === "edit" ? "true" : "false"}
                    mode={formMode}
                    initialData={item}
                />
            )}
        </div>
    );
};

export default Actions;
