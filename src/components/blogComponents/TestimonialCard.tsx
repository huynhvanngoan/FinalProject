"use client";
import React from "react";
import { Autoplay, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

// Sample testimonial data
const testimonials = [
    {
        name: "Brooklyn Simmons",
        role: "Content Writer",
        testimonial:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel urna nec urna auctor dictum. Nullam at nibh eget eros fermentum feugiat sit amet eu augue. Sed pharetra velit ut nisi posuere, non condimentum libero cursus.",
        image: "/india.jpg", // or import the image directly
    },
    {
        name: "Jane Doe",
        role: "Marketing Specialist",
        testimonial:
            "Curabitur imperdiet, tortor at efficitur hendrerit, arcu libero gravida sapien, ac fermentum est quam nec odio. Nulla facilisi. Praesent sit amet vehicula nunc.",
        image: "/path/to/image2.jpg",
    },
    // Add more testimonials as needed
];

const TestimonialCard = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            scrollbar={{
                hide: true,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Scrollbar]}
            className="w-full h-[283px] border-2 border-secondary rounded-md "
        >
            {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                    <div className="text-center text-lg bg-white flex-center flex-col p-[30px] gap-8 cursor-pointer">
                        <div className="flex-center flex-row gap-5">
                            <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="size-12 object-cover rounded-full"
                            />
                            <div className="h-[50px] flex items-start justify-center flex-col">
                                <p className="text-lg font-medium">
                                    {testimonial.name}
                                </p>
                                <p className="text-sm font-normal text-foreground/50">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                        <p className="text-lg text-foreground/70 text-justify">
                            {testimonial.testimonial}
                        </p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TestimonialCard;
