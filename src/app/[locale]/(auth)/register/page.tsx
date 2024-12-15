/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    RegisterBody,
    RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import authApiRequest from "@/apiRquest/auth";
import uploadImageApiRequest from "@/apiRquest/uploadImage";

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const [loading, setLoading] = useState(false);
    // const [previewUrl, setPreviewUrl] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            profilePic: "",
            bio: "",
            gender: "male",
            dob: "",
        },
        mode: "onBlur",
    });

    const onSubmit = async (values: RegisterBodyType) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file as Blob);
            // Log chi tiết FormData
            // console.log("FormData details:");
            // for (const pair of formData.entries()) {
            //     console.log(pair[0], pair[1]);
            // }

            const uploadImageResult = await uploadImageApiRequest.uploadImage(
                formData
            );
            const imgUrl = uploadImageResult.payload.url;
            if (values.dob) {
                const dobDate = new Date(values.dob);
                values.dob = dobDate.toISOString();
            }

            const res = await authApiRequest.register({
                ...values,
                profilePic: imgUrl,
            });
            console.log(res);
            if (res.status === 201) {
                toast.success("Registration successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => router.push(`/${locale}/login`),
                });
                setLoading(false)
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full space-y-3 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Register
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Create your account
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Profile Picture */}
                        <FormField
                            control={form.control}
                            name="profilePic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <div className="flex justify-center">
                                                {file ? (
                                                    <Image
                                                        width="150"
                                                        height="150"
                                                        src={URL.createObjectURL(
                                                            file
                                                        )}
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
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files?.[0];
                                                            if (file) {
                                                                setFile(file);
                                                                field.onChange(
                                                                    file.name
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </Label>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your first name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your last name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Gender and Date of Birth */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem value="female">
                                                        Female
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Bio */}
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little about yourself"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full py-6 rounded-full bg-primary text-white font-semibold flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            <Icon icon="mdi:account-plus-outline" />
                            {loading ? "Processing" : "Register"}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-gray-600">
                                Already have an account?{" "}
                            </span>
                            <Link
                                href={`/${locale}/login`}
                                className="text-primary hover:underline font-semibold"
                            >
                                Login here
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;
