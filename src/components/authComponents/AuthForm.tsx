/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
    RegisterBody,
    RegisterBodyType,
    LoginBody,
    LoginBodyType,
} from "@/schemaValidations/auth.schema";
import { Textarea } from "../ui/textarea";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

interface AuthFormProps {
    mode: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const isLogin = mode === "login";

    const form = useForm<RegisterBodyType | LoginBodyType>({
        resolver: zodResolver(isLogin ? LoginBody : RegisterBody),
        defaultValues: isLogin
            ? {
                  email: "",
                  password: "",
              }
            : {
                  email: "",
                  first_name: "",
                  last_name: "",
                  password: "",
                  confirmPassword: "",
                  profilePic: "",
                  bio: "",
              },
        mode: "onBlur",
    });

    const onSubmit = (values: RegisterBodyType | LoginBodyType) => {
        console.log(values);
    };

    const handleGoogleSignIn = () => {
        console.log("Google sign-in clicked");
    };

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreviewUrl(result);
                onChange(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary py-2 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-3xl w-full space-y-3 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {isLogin ? "Login" : "Register"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? "Welcome back" : "Create your account"}
                    </p>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full py-6 rounded-full border-2 hover:bg-gray-50 font-semibold flex items-center justify-center gap-2"
                    onClick={handleGoogleSignIn}
                >
                    <Icon icon="flat-color-icons:google" className="w-5 h-5" />
                    Continue with Google
                </Button>

                <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                        or {isLogin ? "login" : "register"} with email
                    </span>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {!isLogin && (
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
                                                    <label className="cursor-pointer">
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
                                                    </label>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Icon
                                                icon="material-symbols:mail-outline"
                                                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                            />
                                            <Input
                                                placeholder="Enter your email"
                                                className="pl-10 h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                                                type="email"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Icon
                                                        icon="mdi:user-outline"
                                                        className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                                    />
                                                    <Input
                                                        placeholder="Enter your first name"
                                                        className="pl-10 h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Icon
                                                        icon="mdi:user-circle-outline"
                                                        className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                                    />
                                                    <Input
                                                        placeholder="Enter your last name"
                                                        className="pl-10 h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <div
                            className={!isLogin ? "grid grid-cols-2 gap-4" : ""}
                        >
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Icon
                                                    icon="mdi:lock-outline"
                                                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                                />
                                                <Input
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    className="pl-10 h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {!isLogin && (
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-nowrap">
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Icon
                                                        icon="mdi:lock-check-outline"
                                                        className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                                    />
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm your password"
                                                        className="pl-10 h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        {!isLogin && (
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Icon
                                                    icon="mdi:text-box-outline"
                                                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                                />
                                                <Textarea
                                                    placeholder="Tell us a little about yourself"
                                                    className="resize-none pl-10 pt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <Button
                            type="submit"
                            className="w-full py-6 rounded-full bg-primary hover:bg-primary text-white font-semibold flex items-center justify-center gap-2"
                        >
                            <Icon
                                icon={
                                    isLogin
                                        ? "mdi:login"
                                        : "mdi:account-plus-outline"
                                }
                                className="w-5 h-5"
                            />
                            {isLogin ? "Login" : "Register"}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-gray-600">
                                {isLogin
                                    ? "Don't have an account? "
                                    : "Already have an account? "}
                            </span>
                            <Link
                                href={isLogin ? `register` : `login`}
                                className="text-primary hover:underline font-semibold"
                            >
                                {isLogin ? "Register here" : "Login here"}
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AuthForm;
