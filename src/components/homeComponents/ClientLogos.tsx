/* eslint-disable @next/next/no-img-element */
import React from "react";
import Logo1 from "@/public/Logos01.svg";
import Logo2 from "@/public/Logos02.svg";
import Logo3 from "@/public/Logos03.svg";
import Logo4 from "@/public/Logos04.svg";
import Logo5 from "@/public/Logos05.png";
import Logo6 from "@/public/Logos06.png";
import Image from "next/image";

const Logos = [
    {
        logo: Logo1,
        alt: "Logo 1",
    },
    {
        logo: Logo2,
        alt: "Logo 2",
    },
    {
        logo: Logo3,
        alt: "Logo 3",
    },
    {
        logo: Logo4,
        alt: "Logo 4",
    },
    {
        logo: Logo5,
        alt: "Logo 5",
    },
    {
        logo: Logo6,
        alt: "Logo 6",
    },
];

const ClientLogos = () => {
    return (
        <div className="lg:h-[163px] h-[100px] w-full px-20 py-6 flex flex-row items-center justify-around bg-[#FAFAFA]">
            {Logos.map((logo, index) => (
                <div key={index} className="mr-2 w-full flex-center">
                    <Image src={logo.logo} alt={logo.alt} className="size-[100px] object-contain" />
                </div>
            ))}
        </div>
    );
};

export default ClientLogos;
