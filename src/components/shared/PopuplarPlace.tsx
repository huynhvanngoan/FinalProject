/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "@/styles/Swiper.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import bostonUSA from "@/public/boston-usa.jpg";
import chile from "@/public/chile.jpg";
import frenchAlps from "@/public/french-alps.jpg";
import india from "@/public/india.jpg";
import maldives from "@/public/maldives.jpg";
import newyork from "@/public/newyork.jpg";
import palm from "@/public/palm.jpg";
import phuket from "@/public/phuket.jpg";
import singapore from "@/public/singapore.jpg";
import srilanka from "@/public/srilanka.jpg";
const thumbnails = [
    { src: bostonUSA, alt: "Boston, USA" },
    { src: chile, alt: "Chile" },
    { src: frenchAlps, alt: "French Alps" },
    { src: india, alt: "India" },
    { src: maldives, alt: "Maldives" },
    { src: newyork, alt: "New York" },
    { src: palm, alt: "Palm" },
    { src: phuket, alt: "Phuket" },
    { src: singapore, alt: "Singapore" },
    { src: srilanka, alt: "Sri Lanka" },
];

const PopularPlaces = () => {
    return (
        <div className="w-2/3 lg:w-2/5 ml-10 sm:ml-20 lg:ml-0  lg:mt-56 xxl:mt-36">
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                {thumbnails.map((thumbnail, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={thumbnail.src}
                            alt={thumbnail.alt}
                            width={312}
                            height={500}
                        />
                    </SwiperSlide>
                ))}
                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <Icon
                            icon="iconoir:arrow-left-circle"
                            className="text-primary"
                        />
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <Icon
                            icon="iconoir:arrow-right-circle"
                            className="text-primary"
                        />
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
};

export default PopularPlaces;
