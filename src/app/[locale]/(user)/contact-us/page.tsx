import React from "react";
import bgImg from "@/public/contactus.jpg";
import Banner from "@/components/shared/Banner";
import Map from "@/components/shared/Map";
import GetTouchUs from "@/components/contactComponents/GetTouchUs";
import ContactForm from "@/components/contactComponents/ContactForm";
const ContactPage = () => {
    return (
        <main className="size-full">
            <Banner bgImage={bgImg} title="Contact Us" />
            <div className="flex flex-col p-5 sm:p-10 gap-28 lg:p-16 xl:p-24 size-full">
                <div className="w-full flex md:flex-row flex-col md:gap-30 gap-14">
                    <div className="md:w-1/2 w-full">
                        <GetTouchUs />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <Map location="Cantho" />
                    </div>
                </div>
            </div>
            <div className="size-full">
                <div className="w-full h-[480px] bg-white mx-auto flex items-center justify-start flex-col py-[50px] xs:mb-20 mb-52">
                    <h2 className="text-3xl mx-auto font-semibold">
                        Send Us a Message
                    </h2>
                    <p className="text-lg w-[50%] font-normal text-foreground/50 text-center mt-4">
                        Feel free to drop us a message about your ideas,
                        projects, or questions. We&apos;re here to listen,
                        provide support, and turn your vision into reality.
                        Let&apos;xs connect and make something extraordinary
                        together!
                    </p>
                </div>
                <ContactForm />
            </div>
        </main>
    );
};

export default ContactPage;
