/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Logo from "@/public/Logo.svg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const socialIcons = [
    {
        icon: "ic:sharp-facebook",
        href: "#",
        ariaLabel: "Visit our Facebook page",
    },
    {
        icon: "mage:instagram-circle",
        href: "#",
        ariaLabel: "Follow us on Instagram",
    },
    {
        icon: "entypo-social:youtube-with-circle",
        href: "#",
        ariaLabel: "Subscribe to our YouTube channel",
    },
    {
        icon: "entypo-social:linkedin-with-circle",
        href: "#",
        ariaLabel: "Connect with us on LinkedIn",
    },
];
const Footer = () => {
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    return (
        <footer className="size-full mt-10 bg-[#012E41] py-10 px-10 md:px-[150px] flex flex-col text-white">
            <div className="size-full flex flex-wrap gap-24 lg:flex-row">
                <div className="flex-1 space-y-5 gap-5">
                    <Link href={`/${locale}`}>
                        <Image
                            src={Logo}
                            alt="..."
                            width={200}
                            className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                        />
                    </Link>
                    <p className="text-lg font-normal text-wrap">
                        Discover unforgettable journeys with Gre&apos;s Booking. We
                        craft personalized adventures and seamless experiences,
                        making your dream destinations a reality.
                    </p>
                    <p>Connect with us</p>
                    <div className="flex flex-row flex-wrap gap-4">
                        {socialIcons.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                aria-label={item.ariaLabel}
                                className="transition-colors duration-300 hover:text-primary"
                            >
                                <Icon
                                    icon={item.icon}
                                    width="40"
                                    height="40"
                                    className="transition-all duration-300"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Quick Link</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href={`/${locale}`}>Home</Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/about-us`}>About Us</Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/destination`}>
                                Destination
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/our-tour`}>Our Tour</Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/blog`}>Blog</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Quick Link</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#">FAQ&apos;s</a>
                        </li>
                        <li>
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#">Term & Conditions</a>
                        </li>
                        <li>
                            <a href="#">Support</a>
                        </li>
                    </ul>
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Quick contact</h3>
                    <p>218 Thornridge Cir.Syracuse, Connecticut 35624</p>
                    <p>123 456 7890</p>
                    <p>traverse123@gmail.com</p>
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Become a member</h3>
                    <div className="flex items-center gap-4">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-[#012E41] border border-gray-500 rounded-md px-4 py-2 focus:outline-none"
                        />
                        <Button className="bg-[#FF9F00] text-white rounded-md px-4 py-2 font-semibold">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-sm">
                <p>
                    &copy; Copyright Traverse Holidays Agency All Rights
                    Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
