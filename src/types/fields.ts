/* eslint-disable @typescript-eslint/no-explicit-any */
export type Fields = {
    name: string;
    label: string;
    type?: "text" | "select" | "date" | "file";
    options?: { value: string; label: string }[];
    required?: boolean;
    placeholder?: string;
    render?: (value: any, formData: Record<string, any>) => React.ReactNode;
    icon?: string;
    multiple?: boolean; 
};
