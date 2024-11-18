import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

interface BlogCardProps {
    title: string;
    description: string;
    readTime: string;
    imageSrc: string | StaticImageData;
    link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    title,
    description,
    readTime,
    imageSrc,
    link,
}) => {
    return (
        <div className=" relative w-full border rounded-lg pt-5 pb-[30px] pr-5 pl-[30px] group overflow-hidden">
            <div className="relative z-10 h-[450px] w-full">
                {/* Read Time */}
                <div className="absolute py-1 px-4 rounded-full right-0 bg-white/[0.3] text-white">
                    <span>{readTime} Read</span>
                </div>
                {/* Content */}
                <div className="absolute bottom-0 flex flex-col gap-2 w-full">
                    <h2 className="text-2xl font-bold leading-tight text-white">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-sm">{description}</p>
                    <Link href={link}>
                        <Button className="hidden text-center group-hover:block text-sm font-medium text-white bg-primary rounded-full hover:shadow-lg hover:text-white transition">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Background Image */}
            <div className="absolute top-0 right-0 w-full h-[500px]">
                <Image
                    src={imageSrc}
                    alt={title}
                    className="size-full object-cover rounded-lg"
                    layout="fill"
                />
            </div>
        </div>
    );
};

export default BlogCard;
