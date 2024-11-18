"use client";

import React from "react";
import { Icon } from "@iconify/react";
import AppHeader from "../shared/AppHeader";
import Image from "next/image";
import AboutInfo1 from "@/public/aboutinfo1.jpg";
import AboutInfo2 from "@/public/aboutinfo2.jpg";
import { Button } from "../ui/button";
import HighlightTitle from "../shared/HighlightTitle";
import { toast } from "react-toastify";
const AboutInfo = () => {
    const handleCopyPhoneNumber = () => {
        const phoneNumber = "0123456789";
        navigator.clipboard.writeText(phoneNumber).then(() => {
            toast.success("Phone number copied to clipboard!");
        });
    };

    return (
        <section className="gap-30 flex-center flex-col xl:flex-row">
            <div className="flex flex-row xl:w-1/2 w-full relative">
                <div className="absolute -z-10 w-[55%] h-[554px] rounded-md hover:shadow-gray-500 transition-all duration-300 ease-in-out hover:scale-[1.02]">
                    <Image
                        src={AboutInfo1}
                        alt=""
                        className="object-cover size-full rounded-md shadow-gray-500 shadow-lg"
                    />
                </div>
                <div className="z-1 mt-[9%] ml-[45%] gap-[73px] flex flex-col w-full">
                    <div className="w-[192px] bg-secondary p-5 rounded-md shadow-gray-500 shadow-lg">
                        <p>Establishment in</p>
                        <AppHeader
                            text="2005"
                            size="text-[42px]"
                            font="font-bold"
                        />
                    </div>
                    <div className="w-[80%] h-[370px] rounded-md shadow-gray-500 shadow-lg hover:shadow-gray-500 transition-all duration-300 ease-in-out hover:scale-[1.02]">
                        <Image
                            src={AboutInfo2}
                            alt=""
                            className="object-cover size-full rounded-md shadow-gray-500 shadow-lg"
                        />
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex flex-col">
                <HighlightTitle text="About Us" className="text-foreground" />
                <div className="w-full flex flex-col">
                    <h2 className="font-poppins font-bold text-[20px] md:text-[35px] xl:text-[54px] text-foreground leading-normal">
                        Discover Every Corner Of The World With Us.
                    </h2>
                </div>
                <p className="lg:text-xl text-md text-foreground font-light">
                    Join us on an extraordinary journey as we explore every
                    corner of the world together. Our adventures will take you
                    to hidden gems, iconic landmarks, and breathtaking
                    landscapes, offering unforgettable experiences and memories.
                    Discover the beauty and diversity of our planet with us.
                </p>
                <Button
                    onClick={handleCopyPhoneNumber}
                    className="mt-10 lg:py-6 py-4 w-fit flex items-center justify-center gap-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition"
                >
                    <Icon
                        icon="mdi:phone"
                        className="text-[24px] lg:text-[32px]"
                    />
                    <span className="text-sm lg:text-lg">0123456789</span>
                </Button>
            </div>
        </section>
    );
};

export default AboutInfo;
