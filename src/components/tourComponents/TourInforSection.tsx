import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";

interface InfoSectionProps {
    title: string;
    description: string;
    items?: {
        title: string;
        description: string;
    }[];
    maxDescriptionHeight?: number;
}

const InfoSection = ({
    title,
    description,
    items,
    maxDescriptionHeight = 100,
}: InfoSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const paragraphs = description.split(/(?<=\.)\s+/g);
    const third = Math.ceil(paragraphs.length / 3);
    const firstParagraph = paragraphs.slice(0, third).join(" ");
    const secondParagraph = paragraphs.slice(third, 2 * third).join(" ");
    const thirdParagraph = paragraphs.slice(2 * third).join(" ");

    useEffect(() => {
        if (descriptionRef.current) {
            const scrollHeight = descriptionRef.current.scrollHeight;
            setShowButton(scrollHeight > maxDescriptionHeight);
        }
    }, [description, maxDescriptionHeight]);

    return (
        <div className="py-10 border-b-2 space-y-5">
            <h2 className="text-2xl font-medium">{title}</h2>

            <div className="relative">
                <div
                    ref={descriptionRef}
                    className={`text-base text-justify font-medium text-foreground/80 overflow-hidden transition-all duration-300 space-y-4 ${
                        isExpanded ? "" : "line-clamp-3"
                    }`}
                >
                    <p>{firstParagraph}</p>
                    <p>{secondParagraph}</p>
                    <p>{thirdParagraph}</p>
                </div>

                {showButton && (
                    <div className="mr-0">
                        <Button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="bg-transparent shadow-none hover:bg-transparent text-primary p-0 text-base font-semibold"
                        >
                            {isExpanded ? "Show less" : "Show more"}
                        </Button>
                    </div>
                )}
            </div>

            {items && items.length > 0 && (
                <ul className="space-y-4 mt-6">
                    {items.map((item, index) => (
                        <li key={index}>
                            <div className="flex items-start">
                                <span className="w-1 h-1 mt-2 rounded-full bg-foreground mr-3" />
                                <div>
                                    <h3 className="font-medium mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-foreground/70 text-base font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InfoSection;
