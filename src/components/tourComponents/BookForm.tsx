/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { addMonths } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CalendarForm } from "../shared/CalendarForm";
import ComboboxForm from "../shared/Combobox";
import { AppInput } from "../shared/AppInput"; // Import the AppInput component
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ExtraServicesForm from "./ExtraServicesForm";

const FormSchema = z
    .object({
        location: z.string().nonempty("Location is required."),
        checkIn: z.date({ required_error: "Check-in date is required." }),
        checkOut: z.date({ required_error: "Check-out date is required." }),
        travelers: z.number().min(1, "At least one traveler is required."), // Add travelers field
        healthCoverage: z.boolean().optional().default(false),
        medicalInsurance: z.boolean().optional().default(false),
    })
    .refine((data) => data.checkOut > data.checkIn, {
        message: "Check-out date must be after check-in date",
        path: ["checkOut"],
    });

export default function BookForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    const maxBookingDate = addMonths(new Date(), 6);
    const [selectedServices, setSelectedServices] = useState<Set<string>>(
        new Set()
    );

    const handleServiceChange = (serviceId: string, checked: boolean) => {
        setSelectedServices((prev) => {
            const newServices = new Set(prev);
            if (checked) {
                newServices.add(serviceId);
            } else {
                newServices.delete(serviceId);
            }
            return newServices;
        });
    };

    // Tùy chỉnh danh sách dịch vụ (nếu cần)
    const customServices = [
        {
            id: "healthCoverage",
            name: "Health Coverage Insurance",
            price: 218,
            description: "Comprehensive health coverage during your trip",
        },
        {
            id: "medicalInsurance",
            name: "Medical Insurance",
            price: 35,
            description: "Basic medical insurance for emergencies",
        },
        // Thêm các dịch vụ khác tại đây
    ];

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Booking Details:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(
                            {
                                location: data.location,
                                checkIn: data.checkIn
                                    .toISOString()
                                    .split("T")[0],
                                checkOut: data.checkOut
                                    .toISOString()
                                    .split("T")[0],
                                travelers: data.travelers,
                            },
                            null,
                            2
                        )}
                    </code>
                </pre>
            ),
        });
    }

    useEffect(() => {
        form.setValue("location", selectedLocation);
    }, [selectedLocation, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6 shadow-xl p-10 rounded-lg"
            >
                <div className="space-y-4">
                    <ComboboxForm
                        selectedLocation={selectedLocation}
                        onLocationChange={setSelectedLocation}
                    />
                    <CalendarForm
                        control={form.control}
                        name="checkIn"
                        label="Check-in Date"
                        minDate={new Date()}
                        maxDate={maxBookingDate}
                    />
                    <CalendarForm
                        control={form.control}
                        name="checkOut"
                        label="Check-out Date"
                        minDate={form.watch("checkIn") || new Date()}
                        maxDate={maxBookingDate}
                    />
                    {/* Add the AppInput field for travelers */}
                    <AppInput
                        control={form.control}
                        name="travelers"
                        label="Number of Travelers"
                        type="number"
                        placeholder="Enter number of travelers"
                        icon="ic:outline-group" // Group icon for travelers
                    />
                    <ExtraServicesForm
                        control={form}
                        services={customServices}
                        onServiceChange={handleServiceChange}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full py-5 rounded-full bg-primary text-white hover:scale-105 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
                >
                    Book Now
                </Button>
            </form>
        </Form>
    );
}
