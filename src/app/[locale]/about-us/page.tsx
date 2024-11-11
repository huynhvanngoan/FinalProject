import React from "react";
import bgImg from "@/public/aboutus.jpg";
import Banner from "@/components/shared/Banner";
import AboutInfo from "@/components/aboutComponents/AboutInfo";
import VideoEmbed from "@/components/shared/VideoEmbed";
import ReasonChoose from "@/components/aboutComponents/ReasonChoose";
import TravelExperiences from "@/components/homeComponents/TravelExperiences";
import ClientLogos from "@/components/homeComponents/ClientLogos";
const About = () => {
    return (
        <main className="size-full flex flex-col">
            <Banner bgImage={bgImg} title="About Us" />
            <div className="flex flex-col gap-y-20 p-10 lg:p-16 xl:p-24 size-full">
                <AboutInfo />
            </div>
            <VideoEmbed videoId="1027948177" />
            <div className="flex flex-col gap-y-20 p-10 lg:p-16 xl:p-24 size-full">
                <ReasonChoose />
                <TravelExperiences />
            </div>
            <ClientLogos />
        </main>
    );
};

export default About;
