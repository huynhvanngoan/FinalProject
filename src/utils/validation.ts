// validationSchemas.ts
import * as Yup from "yup";

// Schema cho User
export const userValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    bio: Yup.string().max(250, "Bio cannot exceed 250 characters"),
});

// Schema cho Tour
export const tourValidationSchema = Yup.object().shape({
    thumbnail: Yup.string()
        .url("Invalid URL")
        .required("Thumbnail is required"),
    title: Yup.string().required("Title is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.number()
        .positive("Price must be positive")
        .required("Price is required"),
    startDate: Yup.date().required("Start date is required"),
    duration: Yup.number()
        .positive("Duration must be positive")
        .required("Duration is required"),
    rating: Yup.string().required("Rating is required"),
    description: Yup.string().required("Description is required"),
});


// Tạo mapping giữa title và schema
const validationSchemas: Record<string, Yup.AnyObjectSchema> = {
    User: userValidationSchema,
    Tour: tourValidationSchema,
    // Thêm các schema khác nếu cần
};

export default validationSchemas;
