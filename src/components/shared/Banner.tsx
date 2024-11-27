/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { StaticImageData } from "next/image";

interface BannerProps {
    bgImage: string | StaticImageData;
    title: string;
}

const Banner: React.FC<BannerProps> = ({ bgImage, title }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const bgImageUrl = typeof bgImage === "string" ? bgImage : bgImage.src;

    // Remove locale from pathname if present and split into segments
    const cleanPathname = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
    const routeSegments = cleanPathname.split("/").filter(Boolean);

    // Create breadcrumb items with paths including locale
    const breadcrumbItems = routeSegments.map((segment, index) => {
        // Build the path without locale first
        const cleanPath = "/" + routeSegments.slice(0, index + 1).join("/");
        // Add locale to the final path
        const localePath = `/${locale}${cleanPath}`;

        return {
            label:
                segment.replace(/-/g, " ").charAt(0).toUpperCase() +
                segment.slice(1).replace(/-/g, " "),
            path: localePath,
        };
    });

    return (
        <div
            className="w-full h-[500px] relative flex flex-col justify-center items-center text-center text-white"
            style={{
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10">
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-gray-300 mt-2">
                    <span
                        className="cursor-pointer hover:underline"
                        onClick={() => router.push(`/${locale}`)}
                    >
                        Home
                    </span>
                    {breadcrumbItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className="mx-2">›</span>
                            <span
                                className="cursor-pointer hover:underline"
                                onClick={() => router.push(item.path)}
                            >
                                {item.label}
                            </span>
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default Banner;
