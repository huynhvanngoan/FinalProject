/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiEye } from "react-icons/fi";

interface DestinationCardProps {
    height?: string;
    image: string | StaticImageData;
    title: string;
    description: string;
    buttonText?: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
    height,
    image,
    title,
    description,
    buttonText = "book-tour",
}) => {
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const t = useTranslations("General");
    return (
        <Link
            href={`/${locale}/destination/${title
                .toLocaleLowerCase()
                .replace(" ", "-")}`}
        >
            <div
                className={`relative w-full ${height} border rounded-lg group overflow-hidden`}
            >
                {/* Nút "All Packages" */}
                <div className="absolute z-10 py-1 px-4 rounded-full right-4 top-4 bg-white/[0.3] text-white text-sm group-hover:bg-white group-hover:text-primary transition-all">
                    <span>{t("all-packages")}</span>
                </div>

                {/* Ảnh nền */}
                <div className="absolute inset-0">
                    <Image
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg"
                        layout="fill"
                    />
                </div>

                {/* Overlay & Nội dung */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Biểu tượng và nút Book Tour */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.3] group-hover:bg-white text-white group-hover:text-primary transition-all">
                            <FiEye size={24} />
                        </div>
                        <span className="text-sm font-medium tracking-wide">
                            {t(buttonText)}
                        </span>
                    </div>
                </div>

                {/* Tiêu đề và mô tả */}
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default DestinationCard;
