// components/AppText.tsx
import React from "react";

interface AppTextProps {
    text: string;
    className?: string;
}

const AppText: React.FC<AppTextProps> = ({
    text,
    className = ""
}) => {
    return (
        <div className={className} >
            {text}
        </div>
    );
};

export default AppText;
