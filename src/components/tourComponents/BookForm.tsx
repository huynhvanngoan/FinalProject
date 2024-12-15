/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from "react";
import { Control } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CalendarForm } from "@/components/shared/CalendarForm";
import ComboboxForm from "@/components/shared/Combobox";
import { AppInput } from "@/components/shared/AppInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CONSTANTS, formSelectConfigs } from "@/utils/constants";
import {
    BookingFormSchemaKey,
    BookingFormSchemaType,
} from "@/schemaValidations/booking.schema";
import { calculateTotalPrice } from "@/utils/calculatePrice";
import ExtraServicesForm from "./ExtraServicesForm";
import { PricingSummary } from "./PricingSummary";
import { useBookingForm } from "@/hooks/useBookings";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormSelect } from "../shared/AppSelect";
import { maxBookingDate } from "@/utils/helpers";
import CheckoutForm from "./CheckoutForm";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function BookForm() {
    const {
        state,
        handleDestinationChange,
        handleServiceChange,
        selectedServiceDetails,
        form,
    } = useBookingForm();
    const [showCheckout, setShowCheckout] = useState(false);

    const totalPrice = useMemo(
        () => calculateTotalPrice(form.getValues(), state.selectedServices),
        [form, state.selectedServices]
    );

    // Memoized submit handler
    const onSubmit = useCallback(
        (data: BookingFormSchemaType) => {
            toast({
                title: "Tour Booking Details:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(
                                {
                                    ...data,
                                    selectedServices: selectedServiceDetails,
                                    pricing: totalPrice,
                                },
                                null,
                                2
                            )}
                        </code>
                    </pre>
                ),
            });
            setShowCheckout(true);
        },
        [selectedServiceDetails, totalPrice]
    );

    const calendarFormConfigs: Array<{
        name: "checkIn" | "checkOut";
        label: string;
        minDate: Date;
        maxDate: Date;
    }> = [
        {
            name: "checkIn",
            label: "Check-in Date",
            minDate: new Date(),
            maxDate: maxBookingDate,
        },
        {
            name: "checkOut",
            label: "Check-out Date",
            minDate: form.watch("checkIn") || new Date(),
            maxDate: maxBookingDate,
        },
    ];

    return (
        <Card className="w-full  mx-auto shadow-xl p-5 rounded-lg">
            <CardHeader>
                <CardTitle>Tour Booking Form</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 "
                    >
                        <div className="grid grid-cols-2 gap-8 w-full">
                            {/* Destination Selection */}
                            <ComboboxForm
                                selectedLocation={state.selectedDestination}
                                onLocationChange={handleDestinationChange}
                            />

                            {/* Number of Travelers */}
                            <AppInput
                                control={form.control}
                                name="travelers"
                                label="Number of Travelers"
                                type="number"
                                placeholder="Enter number of travelers"
                                icon="ic:outline-group"
                            />
                        </div>

                        {/* Tour Type Selection */}
                        <div className="grid grid-cols-2 gap-8 w-full">
                            {formSelectConfigs.map((config) => (
                                <FormSelect
                                    key={config.name}
                                    control={form.control}
                                    name={config.name}
                                    label={config.label}
                                    placeholder={config.placeholder}
                                    options={config.options}
                                />
                            ))}
                        </div>
                        {/* Check-in & Check-out Dates */}
                        <div className="grid grid-cols-2 gap-8 w-full">
                            {calendarFormConfigs.map((config) => (
                                <CalendarForm
                                    key={config.name}
                                    control={form.control}
                                    name={config.name}
                                    label={config.label}
                                    minDate={config.minDate}
                                    maxDate={config.maxDate}
                                />
                            ))}
                        </div>

                        {/* Travel Class Selection */}

                        {/* Additional Form Inputs */}
                        <div className="grid grid-cols-2 gap-8 w-full">
                            {CONSTANTS.FORM_INPUTS.map((input) => (
                                <AppInput
                                    key={input.name}
                                    control={
                                        form.control as Control<BookingFormSchemaType>
                                    }
                                    name={input.name as BookingFormSchemaKey}
                                    label={input.label}
                                    placeholder={input.placeholder}
                                    type={input.type}
                                    icon={input.icon}
                                />
                            ))}
                        </div>

                        {/* Extra Services Form */}
                        <ExtraServicesForm
                            control={form}
                            services={CONSTANTS.CUSTOM_SERVICES}
                            onServiceChange={handleServiceChange}
                        />

                        {/* Pricing Summary */}
                        <PricingSummary totalPrice={totalPrice} />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full py-5 rounded-full bg-primary text-white hover:scale-105 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
                        >
                            Book Now
                        </Button>
                    </form>
                </Form>
                {/* {showCheckout && ( */}
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode: "payment",
                            // amount: convertToSubcurrency(totalPrice.totalCost),
                            amount: 4260,
                            currency: "usd",
                        }}
                    >
                        <CheckoutForm
                            amount={4260}
                        />
                    </Elements>
                {/* )}  */}
            </CardContent>
        </Card>
    );
}
