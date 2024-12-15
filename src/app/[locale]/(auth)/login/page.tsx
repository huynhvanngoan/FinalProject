/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
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
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import authApiRequest from "@/apiRquest/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { sessionToken } from "@/lib/http";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [_, locale] = pathname.split("/");

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const onSubmit = async (values: LoginBodyType) => {
        try {
            const result = await authApiRequest.login(values);
            await authApiRequest.auth({
                sessionToken: result.payload.data.accessToken,
            });

            if (result.status === 200) {
                const userRole = result.payload.data.details.Role.name;

                toast.success("Login successful!", {
                    position: "top-right",
                    autoClose: 3000,
                });

                if (userRole === "Admin") {
                    router.push(`/dashboard`);
                } else {
                    router.push("/");
                }
             
            }
        } catch (error) {
            toast.error("Login failed. Please check your email.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-3 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Welcome back!</p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            className="h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                            className="h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full py-6 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold flex items-center justify-center gap-2"
                        >
                            <Icon icon="mdi:login" className="w-5 h-5" />
                            Login
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-gray-600">
                                Don&apos;t have an account?{" "}
                            </span>
                            <Link
                                href={`/${locale}/register`}
                                className="text-primary hover:underline font-semibold"
                            >
                                Register here
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
