import { Icon } from "@iconify/react/dist/iconify.js";
import { StaticImageData } from "next/image";
import React from "react";

interface ImageCardProps {
    backgroundImage: string | StaticImageData;
}
const ImageCard: React.FC<ImageCardProps> = ({ backgroundImage }) => {
    const imageUrl =
        typeof backgroundImage === "string"
            ? backgroundImage
            : backgroundImage?.src;
    return (
        <div
            className="relative size-72 rounded-lg  overflow-hidden group cursor-pointer "
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="transform text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Icon icon="uil:instagram" width="48" height="48" />
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
