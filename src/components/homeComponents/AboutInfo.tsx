/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "../ui/button";
import Aboutus from "@/public/traveler.jpg"
import HighlightTitle from "../shared/HighlightTitle";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutInfo = () => {
    const t = useTranslations("HomePage")
    return (
        <section className="pb-10 w-full flex-center xl:flex-row flex-col gap-16">
            <div className="xl:w-1/3 sm:w-4/5 w-full  flex flex-col">
                {" "}
                {/* <p className="font-sacramento text-3xl xxl:text-4xl  mb-0">
                    About Us
                </p> */}
                <HighlightTitle text="about-us" className="text-foreground" />
                <div className="w-full flex flex-col">
                    <h2 className="font-poppins font-bold text-[20px] md:text-[35px] xl:text-[54px] text-foreground leading-normal">
                        {t("tagline")}
                    </h2>
                </div>
                <p className="lg:text-xl text-md text-foreground  font-light">
                    {t('about-description')}
                </p>
                <Button className="w-64 mt-10 lg:py-6 py-4  rounded-full">
                    {t('about-info')}
                </Button>
            </div>
            <div className=" xl:w-2/4 sm:w-4/5 w-full bg-white shadow-md rounded-lg  border border-gray-200 relative xl:ml-auto md:h-[672px] sm:h-[550px] xs:h-[450px] h-[200px] p-2">
                <div className=" bg-gray-300 size-full flex items-center justify-center ">
                    {/* Placeholder for Image */}
                    <Image
                        src={Aboutus}
                        alt="..."
                        className="object-cover size-full"
                    />
                </div>
                <div className="absolute xl:bottom-14 md:-bottom-16 sm:-bottom-10 xs:-bottom-10 -bottom-16 bg-secondary md:text-lg text-xs xl:w-[60%] md:w-[75%]   w-[80%] border-l-2 border-primary p-4 xl:right-[65%] 4k:right-[75%] sm:right-[12%] right-[10%] shadow-md">
                    <p>
                    {t('img-description')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutInfo;
