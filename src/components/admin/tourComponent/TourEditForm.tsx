/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { TourFormValues, tourSchema } from "@/schemaValidations/tour.schema";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/markdown.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import tourApiRequest from "@/apiRquest/tour";
import uploadImageApiRequest from "@/apiRquest/uploadImage";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import destinationApiRequest from "@/apiRquest/destination";

interface TourEditFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TourFormValues) => void;
    initialData: Partial<TourFormValues> & { id: string };
}

export type TourType = {
    id: string;
    name: string;
};

export type Destination = {
    id: string;
    name: string;
};

const TourEditForm: React.FC<TourEditFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [tourTypes, setTourTypes] = useState<TourType[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(
        initialData.photo || "/placeholder.png"
    );

    const form = useForm<TourFormValues>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            ...initialData,
            photo: initialData.photo || "",
            startDate: initialData.startDate
                ? new Date(initialData.startDate).toISOString().split("T")[0] 
                : "",
        },
    });

    useEffect(() => {
        const fetchTourTypes = async () => {
            const response = await tourApiRequest.tourType();
            if (response.status === 200) {
                setTourTypes(response.payload.data);
            }
        };

        const fetchDestinations = async () => {
            const response = await destinationApiRequest.destination();
            if (response.status === 200) {
                setDestinations(response.payload.data);
            }
        };

        fetchTourTypes();
        fetchDestinations();
    }, []);

    const handleSubmit = async (data: TourFormValues) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const uploadResponse = await uploadImageApiRequest.uploadImage(
                formData
            );

            data.photo = uploadResponse.payload.url;
        }
        const formattedData = {
            id: initialData.id,
            ...data,
            startDate: new Date(data.startDate).toISOString(),
        };

        onSubmit(formattedData);
        form.reset();
        setFile(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Tour</DialogTitle>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-4"
                        >
                            {/* Photo */}
                            <FormField
                                control={form.control}
                                name="photo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <div className="space-y-2">
                                                <div className="flex justify-center">
                                                    {file ? (
                                                        <Image
                                                            width="100"
                                                            height="100"
                                                            src={URL.createObjectURL(
                                                                file
                                                            )}
                                                            alt="Tour preview"
                                                            className="size-28 rounded-md object-cover border-2 border-gray-200"
                                                        />
                                                    ) : (
                                                        <Image
                                                            width="100"
                                                            height="100"
                                                            src={previewUrl}
                                                            alt="Tour preview"
                                                            className="size-28 rounded-md object-cover border-2 border-gray-200"
                                                        />
                                                    )}
                                                </div>
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
                                                        onChange={(e) => {
                                                            const selectedFile =
                                                                e.target
                                                                    .files?.[0];
                                                            if (selectedFile) {
                                                                setFile(
                                                                    selectedFile
                                                                );
                                                                setPreviewUrl(
                                                                    URL.createObjectURL(
                                                                        selectedFile
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Other Fields */}
                            <FormField
                                name="title"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tour Title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="location"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tour Location"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="price"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Tour Price"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="startDate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="duration"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Duration (e.g., 3 days)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <FroalaEditor
                                                config={{
                                                    placeholderText:
                                                        "Enter tour description...",
                                                    charCounterCount: true,
                                                }}
                                                tag="textarea"
                                                model={field.value}
                                                onModelChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Select Type */}
                            <FormField
                                name="typeId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value || ""}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {tourTypes.map((type) => (
                                                        <SelectItem
                                                            key={type.id}
                                                            value={type.id}
                                                        >
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Select Destination */}
                            <FormField
                                name="destinationId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value || ""}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a destination" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {destinations.map(
                                                        (destination) => (
                                                            <SelectItem
                                                                key={
                                                                    destination.id
                                                                }
                                                                value={
                                                                    destination.id
                                                                }
                                                            >
                                                                {
                                                                    destination.name
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
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
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TourEditForm;
