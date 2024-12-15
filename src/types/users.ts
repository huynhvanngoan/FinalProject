import { StaticImageData } from "next/image";

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dob: string | null; // Ngày sinh có thể null
    gender: string;
    bio: string;
    profilePic: string | StaticImageData; // Hình ảnh người dùng
    roleId: string; // ID của Role
    Role: {
        id: string; // ID Role
        name: string; // Tên Role (Admin, User, etc.)
    };
};
