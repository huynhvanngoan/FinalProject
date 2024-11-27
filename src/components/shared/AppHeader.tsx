import React from "react";

import { useTranslations } from "next-intl";
interface AppHeaderProps {
    text: string;
    size?: string; // Optional: Tailwind text size classes
    font?: string; // Optional: Tailwind font family classes
}

const AppHeader: React.FC<AppHeaderProps> = ({ text, size, font }) => {
    const textSize = size || "text-[38px]"; // Default size
    const textFont = font || "font-semibold"; // Default font
    const t = useTranslations("General");

    return (
        <div className="inline-block relative">
            <h2
                className={`${textSize} ${textFont} text-foreground leading-tight`}
            >
                {t(text)}
                <span className="block h-[3px] w-[100px] bg-primary mt-1"></span>
            </h2>
        </div>
    );
};

export default AppHeader;
