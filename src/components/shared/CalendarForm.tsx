"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarFormProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    minDate?: Date;
    maxDate?: Date;
}

export function CalendarForm<T extends FieldValues>({
    control,
    name,
    label = "Date",
    minDate = new Date(),
    maxDate,
}: CalendarFormProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full h-12 flex-start text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                        "focus:ring-primary focus:border-primary", // focus styles
                                        "hover:text-primary hover:border-primary", // hover styles
                                        field.value &&
                                            "text-primary border-primary" // selected state
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                    {field.value ? (
                                        format(new Date(field.value), "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={
                                    field.value
                                        ? new Date(field.value)
                                        : undefined
                                }
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date < minDate ||
                                    (maxDate ? date > maxDate : false)
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
