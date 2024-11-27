/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Icon } from "@iconify/react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    phone: z.string().min(10, {
        message: "Please enter a valid phone number.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    subject: z.string().min(4, {
        message: "Subject must be at least 4 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});
export type FormType = z.TypeOf<typeof formSchema>;

const ContactForm = () => {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit(values: any) {
        console.log(values);
    }

    return (
        <Card className="w-full -mt-60 max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-sm">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Icon
                                                icon="mdi:user"
                                                className="w-4 h-4 text-gray-400"
                                            />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="First Name"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
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
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Icon
                                                icon="mdi:user"
                                                className="w-4 h-4 text-gray-400"
                                            />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Last Name"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Icon
                                                icon="mdi:phone"
                                                className="w-4 h-4 text-gray-400"
                                            />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Phone Number"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Icon
                                                icon="mdi:email"
                                                className="w-4 h-4 text-gray-400"
                                            />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Email Address"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Subject */}
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Icon
                                            icon="mdi:message-text"
                                            className="w-4 h-4 text-gray-400"
                                        />
                                    </div>
                                    <FormControl>
                                        <Input
                                            placeholder="Subject"
                                            className="pl-10"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Message */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <Icon
                                            icon="mdi:message-text"
                                            className="w-4 h-4 text-gray-400"
                                        />
                                    </div>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Message"
                                            className="pl-10 min-h-[150px]"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        Send Message
                    </Button>
                </form>
            </Form>
        </Card>
    );
};

export default ContactForm;
