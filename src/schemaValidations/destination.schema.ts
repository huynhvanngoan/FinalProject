import { z } from "zod";

export const destinationSchema = z.object({
    image: z
        .union([z.string().url("Image must be a valid URL"), z.any()])
        .optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
});

export type DestinationFormValues = z.infer<typeof destinationSchema>;
