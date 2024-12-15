"use client";
import React from "react";
import bgImg from "@/public/ourtourdetail.jpg";
import Banner from "@/components/shared/Banner";
import { usePathname } from "next/navigation";
import getCapitalizedTitleFromPath from "@/utils/helpers";
import TourHeader from "@/components/tourComponents/TourHeader";
import InfoSection from "@/components/tourComponents/TourInforSection";
import ItinerarySection from "@/components/tourComponents/ItinerarySection";
import ImageCard from "@/components/tourComponents/ImageCard";
import Demo from "@/public/chile.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import BookForm from "@/components/tourComponents/BookForm";
import Map from "@/components/shared/Map";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import Review from "@/components/shared/Review";

const itineraryData = [
    {
        day: 1,
        title: "Arrival and Familiarization",
        description:
            "Begin your adventure with a smooth arrival and orientation, acquainting yourself with the surroundings and preparing for an exciting journey ahead through captivating destinations and unforgettable experiences.",
    },
    {
        day: 2,
        title: "Urban Exploration",
    },
    {
        day: 3,
        title: "Culinary Workshop",
    },
    {
        day: 4,
        title: "Nature Hike",
    },
    {
        day: 5,
        title: "Free Day",
    },
];

const listImage = [
    {
        imageUrl: Demo,
        title: "Image 1",
        description: "Description of image 1",
    },
    {
        imageUrl: Demo,
        title: "Image 2",
        description: "Description of image 2",
    },
    {
        imageUrl: Demo,
        title: "Image 3",
        description: "Description of image 3",
    },
    {
        imageUrl: Demo,
        title: "Image 4",
        description: "Description of image 4",
    },
    {
        imageUrl: Demo,
        title: "Image 5",
        description: "Description of image 5",
    },
    {
        imageUrl: Demo,
        title: "Image 6",
        description: "Description of image 6",
    },
    {
        imageUrl: Demo,
        title: "Image 7",
        description: "Description of image 7",
    },
    {
        imageUrl: Demo,
        title: "Image 8",
        description: "Description of image 8",
    },
    {
        imageUrl: Demo,
        title: "Image 9",
        description: "Description of image 9",
    },
    {
        imageUrl: Demo,
        title: "Image 10",
        description: "Description of image 10",
    },
];

const TourDetails = () => {
    const pathname = usePathname();
    const title = getCapitalizedTitleFromPath(pathname);

    const fullDescription = ` All our Deluxe rooms feature large windows, offering
                            expansive views of the cityscape and nature. Enjoy a
                            bigger bed, plus bathrooms with bathtubs and showers
                            for ultimate relaxation after a long day. Fast
                            Wi-Fi, satellite TV, and international standard
                            electric sockets are standard throughout the hotel.
                            A wonderful serenity has taken possession of my
                            entire soul, like these sweet mornings of spring
                            which I enjoy with my whole heart. I am alone and
                            feel the charm of existence in this spot, created
                            for the bliss of souls like mine. I am so happy, my
                            dear friend, so absorbed in the exquisite sense of
                            tranquil existence that I neglect my talents. I
                            should be incapable of drawing a single stroke at
                            the present moment, yet I feel I never was a greater
                            artist than now. When the lovely valley teems with
                            vapor around me and the meridian sun strikes the
                            upper surface of the impenetrable foliage of my
                            trees, a few stray gleams steal into the inner
                            sanctuary. I throw myself down among the tall grass
                            by the trickling stream; as I lie close to the
                            earth, a thousand unknown plants catch my eye. I
                            hear the buzz of the little world among the stalks
                            and grow familiar with the countless indescribable
                            forms of the insects and flowers. The gentle breeze
                            whispers stories of distant lands, carrying the sweet
                            fragrance of blooming jasmine and wild orchids. As
                            twilight approaches, the sky transforms into a canvas
                            of brilliant colors, painting the landscape in hues
                            of gold and purple. The chirping of birds creates a
                            natural symphony, harmonizing with the rustling leaves
                            and the distant murmur of the flowing stream. In these
                            moments, time seems to stand still, and the boundaries
                            between self and nature blur into a perfect unity of
                            existence. The fading light casts long shadows across
                            the meadow, creating a magical interplay of light and
                            darkness that dances before my eyes. As night falls,
                            the first stars begin to twinkle in the darkening sky,
                            their celestial light guiding wandering souls through
                            the peaceful darkness. The cool evening air carries
                            the subtle fragrance of night-blooming flowers,
                            while fireflies emerge to perform their enchanting
                            light dance among the shadows. In this tranquil
                            setting, every breath becomes a meditation, and
                            every moment a celebration of life's simple yet
                            profound beauty. The moonlight bathes the landscape
                            in its silvery glow, transforming the familiar
                            scenes of day into a mystical realm of shadow and
                            light, where imagination and reality intertwine in
                            perfect harmony.`;

    const location = "Singapore";
    const details = "20 Guests ~ 10 Beds ~ 3 Baths ~ 6 Cabins";

    return (
        <main className="flex flex-col w-full">
            <Banner bgImage={bgImg} title={title} />
            <section className="flex p-10 lg:p-16 xl:p-24 gap-10">
                <div className="md:w-3/4 w-full">
                    <TourHeader
                        title={title}
                        price={75}
                        location={location}
                        details={details}
                    />

                    <InfoSection
                        title="Description"
                        description={fullDescription}
                        maxDescriptionHeight={100}
                    />

                    <InfoSection
                        title="What's Included / What's Not"
                        description="To assist in planning your trip, we've compiled a list detailing what's included and not included in your tour package. This will provide a clear understanding of what to expect and help you make any necessary arrangements before your journey begins."
                    />

                    <InfoSection
                        title="Important Information"
                        description="To assist in planning your trip, we've compiled a list detailing what's included and not included in your tour package. This will provide a clear understanding of what to expect and help you make any necessary arrangements before your journey begins."
                        items={[
                            {
                                title: "With or without captain",
                                description:
                                    "You can sail the boat yourself (with a required license) or hire a captain when making your reservation.",
                            },
                            {
                                title: "No hidden fees",
                                description:
                                    "Total price includes fees to be paid at check-in (fuel not included unless otherwise specified).",
                            },
                            {
                                title: "Pre-Payment",
                                description:
                                    "50% payment is required to confirm your booking",
                            },
                            {
                                title: "Cancellation policy",
                                description:
                                    "Flexible: Full refund up to 1 day before arrival, excluding service fees and Click & Boat commission",
                            },
                        ]}
                    />
                    <ItinerarySection itineraryData={itineraryData} />
                    <Review />
                    <div className="block md:hidden w-full space-y-12">
                        <BookForm />
                        <Map location={title} />
                    </div>
                </div>
                <aside className="hidden md:block w-1/3 space-y-12">
                    <BookForm />
                    <div className="w-full h-[558px]">
                        <Map location={title} />
                    </div>
                </aside>
            </section>
            <div className="mb-8">
                <Swiper
                    slidesPerView={6}
                    // spaceBetween={5}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Scrollbar, Navigation]}
                    className="w-full h-72"
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 4,
                            spaceBetween: 5,
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 5,
                            spaceBetween: 5,
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 5,
                        },
                    }}
                >
                    {listImage.map((image, index) => (
                        <SwiperSlide
                            key={index}
                            className="rounded-lg overflow-hidden"
                        >
                            <ImageCard backgroundImage={image.imageUrl} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </main>
    );
};

export default TourDetails;
