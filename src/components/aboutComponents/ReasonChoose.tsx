import React from "react";
import HighlightTitle from "../shared/HighlightTitle";
import AppHeader from "../shared/AppHeader";
import About1 from "@/public/about1.jpg";
import About2 from "@/public/about2.jpg";
import About3 from "@/public/about3.jpg";
import Image from "next/image";
const ReasonChoose = () => {
    const cardsData = [
        {
            number: "01",
            title: "4,40,00 Hotels",
            description:
                "Stacks is a cutting-edge library of stackable content blocks, designed for seamless use with React Native.",
        },
        {
            number: "02",
            title: "Global Travel Experts",
            description:
                "Discover the world with our experts. Enjoy personalized itineraries, exclusive deals, and unforgettable experiences.",
        },
        {
            number: "03",
            title: "Top Cruise Lines Worldwide",
            description:
                "Explore the best global cruise lines for exceptional journeys across the seas and unforgettable travel experiences.",
        },
    ];

    return (
        <section className="size-full flex-center flex-col xl:flex-row gap-[70px]">
            <div className="w-2/4 flex flex-col gap-[30px]">
                <div className="flex flex-col mb-5">
                    <HighlightTitle
                        text="Reasons to Choose Us"
                        className="text-foreground"
                    />
                    <AppHeader
                        text="Why Choose Us ?"
                        size="text-[70px]"
                        font="font-bold"
                    />
                </div>
                {cardsData.map((card, index) => (
                    <div
                        key={index}
                        className="w-full flex-center gap-6 flex-row p-[30px] rounded-md border-2 border-secondary shadow-sm hover:shadow-gray-500 transition-all duration-300 ease-in-out hover:scale-[1.02]"
                    >
                        <div className="flex-center gap-[30px] w-[50px] h-[88px] bg-primary rounded-md">
                            <span className="text-[22px] font-semibold text-white">
                                {card.number}
                            </span>
                        </div>
                        <div className="w-full flex items-start justify-start flex-col gap-[10px]">
                            <p className="font-semibold text-xl">
                                {card.title}
                            </p>
                            <p>{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-3/4 h-[800px] flex flex-row gap-[26px]">
                <div className="w-[40%] h-[665px] rounded-md shadow-md hover:shadow-gray-500 transition-all duration-300 ease-in-out hover:scale-[1.02]">
                    <Image
                        src={About1}
                        alt=""
                        className="size-full object-cover rounded-md"
                    />
                </div>
                <div className="w-[50%] mt-14 flex flex-col gap-[26px]">
                    <div className="h-[323px]  w-full rounded-md  shadow-md hover:shadow-gray-500 transition-all duration-300 ease-in-out hover:scale-[1.02]">
                        <Image
                            src={About2}
                            alt=""
                            className="size-full object-cover rounded-md"
                        />
                    </div>
                    <div className="h-[323px] w-2/3 rounded-md  shadow-md hover:shadow-gray-500 transition-all duration-300 ease-in-out hover:scale-[1.02]">
                        <Image
                            src={About3}
                            alt=""
                            className="size-full object-cover rounded-md"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReasonChoose;
