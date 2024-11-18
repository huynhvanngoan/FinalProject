"use client";
import Banner from "@/components/shared/Banner";
import React, { useState } from "react";
import bgImg from "@/public/ourtour.jpg";
import Link from "next/link";
import TourCard from "@/components/shared/TourCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"; // Import các thành phần Pagination từ shadcn/ui
import ClientLogos from "@/components/homeComponents/ClientLogos";

const tourListData = [
    {
        id: 1,
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Sok National Park",
        location: "Bali",
        date: "August 7, 2024",
        price: 88,
        rating: 4.4,
    },
    {
        id: 2,
        imageUrl: "/images/sok-national-park.jpg",
        days: 8,
        title: "Phang Nga Bay",
        location: "Thailand",
        date: "September 12, 2024",
        price: 120,
        rating: 4.7,
    },
    {
        id: 3,
        imageUrl: "/images/sok-national-park.jpg",
        days: 5,
        title: "Yosemite National Park",
        location: "USA",
        date: "October 15, 2024",
        price: 200,
        rating: 4.8,
    },
    {
        id: 4,
        imageUrl: "/images/sok-national-park.jpg",
        days: 10,
        title: "Great Barrier Reef",
        location: "Australia",
        date: "November 25, 2024",
        price: 300,
        rating: 4.9,
    },
    {
        id: 5,
        imageUrl: "/images/sok-national-park.jpg",
        days: 10,
        title: "Kruger National Park",
        location: "South Africa",
        date: "December 5, 2024",
        price: 250,
        rating: 4.6,
    },
    {
        id: 6,
        imageUrl: "/images/amazon-rainforest.jpg",
        days: 7,
        title: "Amazon Rainforest",
        location: "Brazil",
        date: "January 10, 2025",
        price: 180,
        rating: 4.5,
    },
    {
        id: 7,
        imageUrl: "/images/banff-national-park.jpg",
        days: 5,
        title: "Banff National Park",
        location: "Canada",
        date: "February 14, 2025",
        price: 220,
        rating: 4.9,
    },
    {
        id: 8,
        imageUrl: "/images/mount-fuji.jpg",
        days: 3,
        title: "Mount Fuji Tour",
        location: "Japan",
        date: "March 3, 2025",
        price: 150,
        rating: 4.7,
    },
    {
        id: 9,
        imageUrl: "/images/sahara-desert.jpg",
        days: 6,
        title: "Sahara Desert Adventure",
        location: "Morocco",
        date: "April 18, 2025",
        price: 175,
        rating: 4.4,
    },
    {
        id: 10,
        imageUrl: "/images/alps.jpg",
        days: 8,
        title: "Swiss Alps Expedition",
        location: "Switzerland",
        date: "May 9, 2025",
        price: 400,
        rating: 4.9,
    },
    {
        id: 11,
        imageUrl: "/images/patagonia.jpg",
        days: 10,
        title: "Patagonia Hiking Trip",
        location: "Chile",
        date: "June 20, 2025",
        price: 320,
        rating: 4.8,
    },
    {
        id: 12,
        imageUrl: "/images/victoria-falls.jpg",
        days: 4,
        title: "Victoria Falls",
        location: "Zambia",
        date: "July 15, 2025",
        price: 250,
        rating: 4.6,
    },
    {
        id: 13,
        imageUrl: "/images/antarctica.jpg",
        days: 14,
        title: "Antarctica Expedition",
        location: "Antarctica",
        date: "August 30, 2025",
        price: 1000,
        rating: 4.9,
    },
    {
        id: 14,
        imageUrl: "/images/galapagos-islands.jpg",
        days: 9,
        title: "Galapagos Islands",
        location: "Ecuador",
        date: "September 25, 2025",
        price: 450,
        rating: 4.8,
    },
    {
        id: 15,
        imageUrl: "/images/great-wall.jpg",
        days: 3,
        title: "Great Wall of China",
        location: "China",
        date: "October 10, 2025",
        price: 180,
        rating: 4.5,
    },
    {
        id: 16,
        imageUrl: "/images/machu-picchu.jpg",
        days: 7,
        title: "Machu Picchu",
        location: "Peru",
        date: "November 1, 2025",
        price: 380,
        rating: 4.8,
    },
    {
        id: 17,
        imageUrl: "/images/venice.jpg",
        days: 5,
        title: "Venice Tour",
        location: "Italy",
        date: "December 18, 2025",
        price: 300,
        rating: 4.7,
    },
    {
        id: 18,
        imageUrl: "/images/bora-bora.jpg",
        days: 6,
        title: "Bora Bora Island",
        location: "French Polynesia",
        date: "January 8, 2026",
        price: 600,
        rating: 4.9,
    },
    {
        id: 19,
        imageUrl: "/images/grand-canyon.jpg",
        days: 4,
        title: "Grand Canyon Tour",
        location: "USA",
        date: "February 11, 2026",
        price: 240,
        rating: 4.6,
    },
    {
        id: 20,
        imageUrl: "/images/nile-river.jpg",
        days: 7,
        title: "Nile River Cruise",
        location: "Egypt",
        date: "March 30, 2026",
        price: 350,
        rating: 4.8,
    },
    {
        id: 21,
        imageUrl: "/images/santorini.jpg",
        days: 5,
        title: "Santorini Beaches",
        location: "Greece",
        date: "April 12, 2026",
        price: 280,
        rating: 4.7,
    },
    {
        id: 22,
        imageUrl: "/images/taj-mahal.jpg",
        days: 3,
        title: "Taj Mahal Tour",
        location: "India",
        date: "May 6, 2026",
        price: 140,
        rating: 4.5,
    },
    {
        id: 23,
        imageUrl: "/images/blue-lagoon.jpg",
        days: 4,
        title: "Blue Lagoon Spa",
        location: "Iceland",
        date: "June 15, 2026",
        price: 200,
        rating: 4.6,
    },
    {
        id: 24,
        imageUrl: "/images/serengeti.jpg",
        days: 10,
        title: "Serengeti Safari",
        location: "Tanzania",
        date: "July 25, 2026",
        price: 420,
        rating: 4.9,
    },
    {
        id: 25,
        imageUrl: "/images/amalfi-coast.jpg",
        days: 6,
        title: "Amalfi Coast",
        location: "Italy",
        date: "August 19, 2026",
        price: 340,
        rating: 4.7,
    },
];

const OurTour = () => {
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 12; // Số thẻ trên mỗi trang

    // Tính toán danh sách hiển thị
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTours = tourListData.slice(indexOfFirstItem, indexOfLastItem);

    // Tổng số trang
    const totalPages = Math.ceil(tourListData.length / itemsPerPage);

    // Hàm chuyển trang
    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    return (
        <main className="size-full flex flex-col">
            <Banner bgImage={bgImg} title="Our Tour" />
            <div className="flex flex-col gap-y-20 p-10 lg:p-16 xl:p-24 size-full">
                <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5 lg:gap-10">
                    {currentTours.map((tour) => (
                        <Link key={tour.id} href={"/"}>
                            <TourCard
                                key={tour.id}
                                imageUrl={tour.imageUrl}
                                days={tour.days}
                                title={tour.title}
                                location={tour.location}
                                date={tour.date}
                                price={tour.price}
                                rating={tour.rating}
                            />
                        </Link>
                    ))}
                </div>

                {/* Phân trang */}
                <div className="flex justify-center items-center mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    className={`cursor-pointer hover:text-primary hover:bg-primary/20 ${
                                        currentPage === 1
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                    }`}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                        isActive={currentPage === index + 1}
                                        className="cursor-pointer hover:text-primary hover:bg-primary/20"
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    className={`cursor-pointer hover:text-primary hover:bg-primary/20 ${
                                        currentPage === totalPages
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                    }`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <ClientLogos />
        </main>
    );
};

export default OurTour;
