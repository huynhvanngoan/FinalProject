import { StaticImageData } from "next/image";

export type Post = {
    id: string;
    title: string;
    slug: string;
    readingTime: number;
    content: string;
    summary: string;
    coverImage: string | StaticImageData;
    published: boolean;
    authorId: string;
};
