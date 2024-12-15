import z from "zod";

// Updated RegisterBody schema
export const RegisterBody = z
    .object({
        profilePic: z.string().optional(),
        bio: z.string().trim().max(1000).optional(),
        firstName: z.string().trim().min(2).max(256),
        lastName: z.string().trim().min(2).max(256),
        email: z.string().email(),
        password: z.string().min(6).max(100),
        // confirmPassword: z.string().min(6).max(100),
        gender: z.enum(["male", "female", "other"]).optional(),
        dob: z
            .string()
            .optional()
            .refine(
                (date) => !date || !isNaN(new Date(date).getTime()),
                "Invalid date format"
            ),
    })
    .strict();
// .superRefine(({ confirmPassword, password }, ctx) => {
//     if (confirmPassword !== password) {
//         ctx.addIssue({
//             code: "custom",
//             message: "Passwords do not match",
//             path: ["confirmPassword"],
//         });
//     }
// });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

// Updated RegisterRes schema
export const RegisterRes = z.object({
    data: z.object({
        accessToken: z.string(),
        expiresAt: z.string(),
        account: z.object({
            userId: z.number(),
            userName: z.string(),
            first_name: z.string(),
            last_name: z.string(),
            email: z.string(),
            profilePic: z.string().url().optional(),
            bio: z.string().optional(),
            gender: z.enum(["male", "female", "other"]).optional(),
            dob: z.string().optional(),
        }),
        details: z.record(z.any()),
    }),
    message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

// Updated LoginBody schema
export const LoginBody = z
    .object({
        email: z.string(), // Accepts either email or username
        password: z.string().min(6).max(100),
    })
    .refine(
        (data) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
            data.email.trim().length >= 3,
        {
            message: "Invalid email ",
            path: ["email"], // Customize error for `credential`
        }
    );

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;

// Updated SlideSessionBody schema
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;

export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
