/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import Image from "next/image";
import {
    DestinationFormValues,
    destinationSchema,
} from "@/schemaValidations/destination.schema";

interface DestinationAddFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: DestinationFormValues) => void;
}

const DestinationAddForm: React.FC<DestinationAddFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const form = useForm<DestinationFormValues>({
        resolver: zodResolver(destinationSchema),
        defaultValues: {
            title: "",
            description: "",
            image: undefined,
        },
    });

    const handleSubmit = (data: DestinationFormValues) => {
        onSubmit(data);
        form.reset();
        setPreviewUrl("");
        onClose();
    };

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        onChange?: (...event: any[]) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
            onChange?.(file);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Destination</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        {/* Image */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({
                                field: { value, onChange, ...field },
                            }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <div className="flex justify-center">
                                                {previewUrl ? (
                                                    <Image
                                                        width="150"
                                                        height="150"
                                                        src={previewUrl}
                                                        alt="Destination preview"
                                                        className="size-28 rounded-md object-cover border-2 border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="size-28 rounded-md bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                                        <Icon
                                                            icon="mdi:camera"
                                                            className="size-10 text-gray-400"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex justify-center">
                                                <Label className="cursor-pointer">
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                                        <Icon
                                                            icon="mdi:upload"
                                                            className="w-5 h-5"
                                                        />
                                                        <span>
                                                            Choose Image
                                                        </span>
                                                    </div>
                                                    <Input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            handleImageChange(
                                                                e,
                                                                onChange
                                                            )
                                                        }
                                                        {...field}
                                                    />
                                                </Label>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Title */}
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Destination Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <textarea
                                            placeholder="Destination Description"
                                            {...field}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            rows={4}
                                        />
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
                            <Button type="submit">Add Destination</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default DestinationAddForm;
