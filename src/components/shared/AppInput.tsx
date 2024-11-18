"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Icon } from "@iconify/react/dist/iconify.js"; // For using icons

interface AppInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    type?: string;
    icon?: string; // Optional icon for the input
}

export function AppInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "Enter value",
    type = "text",
    icon, // Destructure the icon prop
}: AppInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                    <FormControl>
                        <div className="relative group">
                            {icon && (
                                <Icon
                                    icon={icon} // The icon passed as prop
                                    className={cn(
                                        "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 opacity-50",
                                        "group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300",
                                        "group-hover:text-primary group-focus:text-primary",
                                        field.value
                                            ? "text-primary border-primary"
                                            : "text-muted-foreground" // selected state
                                    )}
                                />
                            )}
                            <Input
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                {...field}
                                className={cn(
                                    "w-full h-12 px-3 pl-10 text-md font-medium border rounded-md",
                                    "focus:ring-primary focus:border-primary", // focus styles
                                    "hover:text-primary hover:border-primary", // hover styles
                                    "group-hover:border-primary group-focus:border-primary", // group hover styles
                                    field.value
                                        ? "text-primary border-primary"
                                        : "text-muted-foreground", // selected state
                                    "transition-all duration-200" // smooth transitions
                                )}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
