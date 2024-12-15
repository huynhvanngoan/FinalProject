import { z } from "zod";

export const postSchema = z.object({
    title: z.string().nonempty("Title is required"),
    slug: z.string().nonempty("Slug is required"),
    readingTime: z.number().min(0, "Reading time must be non-negative"),
    summary: z.string().nonempty("Summary is required"),
    coverImage: z
        .union([z.string().url("Image must be a valid URL"), z.any()])
        .optional(),
    published: z.boolean(),
    content: z.string().nonempty("Content is required"),
});

export type PostFormValues = z.infer<typeof postSchema>;
