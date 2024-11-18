/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fields } from "./fields";
export interface PopupFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Record<string, any>, mode: "add" | "edit") => void;
    fields: Fields[];
    title?: string;
    initialData?: Record<string, any> | null;
    mode?: "add" | "edit" | "view";
    onEdit?: (formData: Record<string, any>) => void;
}
