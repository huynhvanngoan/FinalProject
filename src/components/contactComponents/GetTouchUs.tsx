/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

import { toast } from 'react-toastify';

interface ContactInfo {
    icon: string;
    title: string;
    content: string;
    copyable?: boolean;
}

const GetTouchUs = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const contactInfo: ContactInfo[] = [
        {
            icon: "material-symbols:location-on",
            title: "Office Address",
            content: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
            copyable: true,
        },
        {
            icon: "material-symbols:phone-enabled",
            title: "Phone Number",
            content: "+99 123 456 7890",
            copyable: true,
        },
        {
            icon: "material-symbols:mail-outline",
            title: "Email Address",
            content: "traverse123@gmail.com",
            copyable: true,
        },
    ];

    const handleCopy = async (content: string, title: string) => {
        try {
            await navigator.clipboard.writeText(content);
            toast.success(`${title} copied to clipboard!`);
        } catch (err) {
            toast.error("Failed to copy to clipboard");
        }
    };

    return (
        <div className="flex flex-col w-full gap-8 p-6 md:p-8">
            <div className="flex flex-col gap-3 max-w-3xl">
                <h2
                    className="text-4xl text-primary font-semibold 
                    relative after:content-[''] after:absolute after:-bottom-2 
                    after:left-0 after:w-20 after:h-1 after:bg-primary"
                >
                    Get In Touch
                </h2>
                <p className="text-lg font-normal text-foreground/50 text-justify mt-4">
                    Whether you have a question, a project in mind, or just want
                    to say hello, we&apos;re here to help! Reach out to us, and
                    we&apos;ll get back to you as soon as possible.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                {contactInfo.map((info, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col gap-4 p-6 rounded-xl 
                            border border-border/40 hover:border-primary/40 
                            transition-all duration-300 ease-in-out
                            hover:shadow-lg hover:shadow-primary/5
                            hover:-translate-y-1 bg-background"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="p-3 bg-primary/10 rounded-lg 
                                group-hover:bg-primary/20 transition-colors duration-300"
                            >
                                <Icon
                                    icon={info.icon}
                                    className={`w-8 h-8 text-primary 
                                        transition-transform duration-300
                                        ${
                                            hoveredIndex === index
                                                ? "scale-110"
                                                : ""
                                        }`}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-medium text-foreground">
                                    {info.title}
                                </h3>
                                <p
                                    className="text-foreground/60 group-hover:text-foreground/80 
                                    transition-colors duration-300"
                                >
                                    {info.content}
                                </p>
                            </div>
                        </div>

                        {info.copyable && (
                            <button
                                onClick={() =>
                                    handleCopy(info.content, info.title)
                                }
                                className="absolute right-4 top-4 p-2 
                                    opacity-0 group-hover:opacity-100
                                    transition-all duration-300 
                                    hover:bg-primary/10 rounded-full"
                            >
                                <Icon
                                    icon="material-symbols:content-copy-outline"
                                    className="w-5 h-5 text-primary"
                                />
                            </button>
                        )}

                        <div
                            className="absolute inset-0 bg-primary/5 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 rounded-xl -z-10"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetTouchUs;
