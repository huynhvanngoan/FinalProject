import { z } from "zod";

export const tourSchema = z.object({
    title: z
        .string()
        .nonempty("Title is required")
        .max(100, "Title is too long"),
    location: z
        .string()
        .nonempty("Location is required")
        .max(200, "Location is too long"),
    price: z
        .any()
        .transform((value) => {
            const parsedValue = parseFloat(value);
            if (isNaN(parsedValue)) throw new Error("Price must be a valid number");
            return parsedValue;
        })
        .refine((value) => value > 0, {
            message: "Price must be greater than 0",
        }),
    startDate: z
        .string()
        .nonempty("Start date is required")
        .refine((date) => !isNaN(new Date(date).getTime()), {
            message: "Invalid date format",
        }),
    duration: z
        .any()
        .transform((value) => {
            const parsedValue = parseInt(value, 10);
            if (isNaN(parsedValue)) throw new Error("Duration must be a valid number");
            return parsedValue;
        })
        .refine((value) => value > 0, {
            message: "Duration must be greater than 0",
        }),
    description: z.string().nonempty("Description is required"),
    photo: z
        .union([z.string().url("Image must be a valid URL"), z.any()])
        .optional(),
    typeId: z.string().nonempty("Type ID is required"),
    destinationId: z.string().optional(), // Destination ID can be optional
});

export type TourFormValues = z.infer<typeof tourSchema>;
