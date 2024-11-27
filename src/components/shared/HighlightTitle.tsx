import { useTranslations } from "next-intl";
import React from "react";

interface HighlightTitleProps {
    text?: string;
    highlightText?: string;
    className?: string;
}

const HighlightTitle: React.FC<HighlightTitleProps> = ({
    text ="",
    highlightText="",
    className = "",
}) => {
    const t  = useTranslations("General");
    return (
        <p
            className={`font-sacramento text-3xl xxl:text-5xl mb-0 ${className}`}
        >
            {highlightText && (
                <span className="text-primary">{t(highlightText)}</span>
            )}{" "}
            {t(text)}
        </p>
    );
};

export default HighlightTitle;
