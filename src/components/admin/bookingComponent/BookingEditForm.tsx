/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminBooking } from "@/types/booking";
import {
    BookingFormValues,
    bookingSchema,
} from "@/schemaValidations/booking.schema";

interface BookingEditFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AdminBooking) => void;
    initialData: Partial<BookingFormValues & { id: string }>;
}

const BookingEditForm: React.FC<BookingEditFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            tourId: initialData.tourId || "",
            userId: initialData.userId || "",
            status: initialData.status || "pending",
        },
    });

    const handleSubmit = (data: BookingFormValues) => {
        onSubmit({
            id: initialData.id || "", // Preserve booking ID
            ...data,
        } as AdminBooking);
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Booking</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        {/* Booking ID (Read-Only) */}
                        <div>
                            <FormLabel>Booking ID</FormLabel>
                            <Input
                                value={initialData.id || "N/A"}
                                readOnly
                                className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Tour ID */}
                        <FormField
                            name="tourId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Tour ID"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* User ID */}
                        <FormField
                            name="userId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter User ID"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status */}
                        <FormField
                            name="status"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="confirmed">
                                                Confirmed
                                            </option>
                                            <option value="canceled">
                                                Canceled
                                            </option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingEditForm;
