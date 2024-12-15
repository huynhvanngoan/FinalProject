/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { UserFormValues, userSchema } from "@/schemaValidations/user.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserAddFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormValues) => void;
}

const UserAddForm: React.FC<UserAddFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            name: "",
            gender: "",
            bio: "",
            userName: "",
            profilePic: "",
        },
    });

    const handleSubmit = (data: UserFormValues) => {
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
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        {/* Profile Picture */}
                        <FormField
                            control={form.control}
                            name="profilePic"
                            render={({
                                field: { value, onChange, ...field },
                            }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <div className="flex justify-center">
                                                {previewUrl ? (
                                                    <Image
                                                        width="150"
                                                        height="150"
                                                        src={previewUrl}
                                                        alt="Profile preview"
                                                        className="size-28 rounded-full object-cover border-2 border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="size-28 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                                        <Icon
                                                            icon="mdi:account-circle"
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
                        {/* Email */}
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Username */}
                        <FormField
                            name="userName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* First Name */}
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Full Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Gender */}
                        <FormField
                            name="gender"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Male">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="Female">
                                                Female
                                            </SelectItem>
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Bio */}
                        <FormField
                            name="bio"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Short bio"
                                            {...field}
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
                            <Button type="submit">Add User</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UserAddForm;
