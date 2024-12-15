import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    name: z.string().min(1, "Name is required"),
    gender: z.string().min(1, "Gender is required"),
    bio: z.string().max(200, "Bio must be less than 200 characters"),
    userName: z.string().min(1, "Username is required"),
    profilePic: z
        .union([
            z.string().url("Profile picture must be a valid URL"),
            z.any(),
        ])
        .optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;
