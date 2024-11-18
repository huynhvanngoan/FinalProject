"use client";

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
    const bgImageUrl = typeof bgImage === "string" ? bgImage : bgImage.src;

    const routeSegments = pathname.split("/").filter(Boolean).slice(1);

    const breadcrumb = routeSegments
        .map(
            (segment) =>
                segment.replace(/-/g, " ").charAt(0).toUpperCase() +
                segment.slice(1).replace(/-/g, " ") // Capitalize
        )
        .join(" › ");

    return (
        <div
            className="-z-10 w-full h-[500px] relative flex flex-col justify-center items-center text-center text-white"
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
                        onClick={() => router.push("/")}
                    >
                        Home
                    </span>{" "}
                    › {breadcrumb}
                </p>
            </div>
        </div>
    );
};

export default Banner;
