/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button } from "../ui/button";
import PopularPlaces from "../shared/PopuplarPlace";
import BannerImage from "@/public/bannerDesktop.jpg";
import Image from "next/image";
import HighlightTitle from "../shared/HighlightTitle";
import { useTranslations } from "next-intl";
const HomeBanner = () => {
    const t = useTranslations("HomePage");
    return (
        <section className="w-full relative flex items-center justify-center z-0">
            <div className="z-10 size-full xl:mt-0 mt-10  flex lg:flex-row  flex-col flex-center">
                <div className="max-w-xl mx-20  lg:ml-32 lg:mr-52 flex flex-col">
                    <HighlightTitle
                        highlightText="holiday"
                        text="agency"
                        className="text-white"
                    />
                    <div className="w-full flex flex-col">
                        <h2 className="font-poppinsBold text-[30px] md:text-[45px] xl:text-[68px] text-white leading-tight">
                            {t('let_make_trip')}
                        </h2>
                        <div className="md:w-28 xl:w-40 w-18 h-1 bg-primary rounded-full"></div>
                    </div>
                    <p className="lg:text-lg text-sm text-white mt-5 font-light">
                        {t('description')}
                    </p>

                    <Button className="mt-10 lg:py-6 py-4 w-24 lg:w-40 rounded-full">
                        {t('cta_button')}
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
