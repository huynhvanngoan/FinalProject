/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button } from "../ui/button";
import PopularPlaces from "../shared/PopuplarPlace";
import BannerImage from "@/public/bannerDesktop.jpg";
import Image from "next/image";
import HighlightTitle from "../shared/HighlightTitle";
const HomeBanner = () => {
    return (
        <section className="w-full relative flex items-center justify-center z-0">
            <div className="z-10 size-full xl:mt-0 mt-10  flex lg:flex-row  flex-col flex-center">
                <div className="max-w-xl mx-20  lg:ml-32 lg:mr-52 flex flex-col">
                    <HighlightTitle
                        highlightText="Holiday"
                        text="Agency"
                        className="text-white"
                    />
                    <div className="w-full flex flex-col">
                        <h2 className="font-poppinsBold text-[30px] md:text-[45px] xl:text-[68px] text-white leading-tight">
                            Let&apos;s Make Your best trip Ever!
                        </h2>
                        <div className="md:w-28 xl:w-40 w-18 h-1 bg-primary rounded-full"></div>
                    </div>
                    <p className="lg:text-lg text-sm text-white mt-5 font-light">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Nostrum eaque, repellendus iure saepe voluptas
                        autem.
                    </p>

                    <Button className="mt-10 lg:py-6 py-4 w-24 lg:w-40 rounded-full">
                        Let&apos;s Explore
                    </Button>
                </div>
                {/* <div> */}
                <PopularPlaces />
                {/* </div> */}
            </div>

            <div className="absolute lg:h-[850px] h-full w-full ">
                <Image
                    src={BannerImage}
                    alt=""
                    className="size-full object-cover"
                />
            </div>
        </section>
    );
};

export default HomeBanner;
