/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const BookingFormSchema = z
    .object({
        destination: z.string().nonempty("Destination is required."),
        tourType: z.string().nonempty("Tour type is required."),
        checkIn: z.date({ required_error: "Tour start date is required." }),
        checkOut: z.date({ required_error: "Tour end date is required." }),
        travelers: z.number().min(1, "At least one traveler is required."),
        travelClass: z.enum(["standard", "premium", "luxury"] as const, {
            required_error: "Tour class is required.",
        }),
        healthCoverage: z.boolean().optional().default(false),
        travelInsurance: z.boolean().optional().default(false),
        specialRequirements: z.string().optional(),

        fullName: z.string().optional(),
        email: z.string().email("Invalid email address").optional(),
        phoneNumber: z
            .string()
            .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
            .optional(),
        passportNumber: z.string().optional(),
        nationality: z.string().optional(),
        dietaryRestrictions: z.string().optional(),
        emergencyContactName: z.string().optional(),
        emergencyContactPhone: z.string().optional(),
    })
    .refine((data: any) => data.checkOut > data.checkIn, {
        message: "Tour end date must be after start date",
        path: ["checkOut"],
    });


export const bookingSchema = z.object({
    tourId: z.string().nonempty("Tour ID is required"),
    userId: z.string().nonempty("User ID is required"),
    status: z.enum(["pending", "confirmed", "canceled"]),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export type BookingFormSchemaType = z.infer<typeof BookingFormSchema>;
export type BookingFormSchemaKey = keyof BookingFormSchemaType;
