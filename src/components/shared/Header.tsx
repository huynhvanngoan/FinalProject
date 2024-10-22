"use client";
import Link from "next/link";
import React from "react";
import ToggleMode from "./ToggleMode";
import DropdownLanguages from "./DropdownLanguages";
import Image from "next/image";
import Logo from "@/public/Logo.svg";
import { navbarItems } from "@/utils/constants";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="bg-secondary p-4 shadow-md">
            <nav className="flex flex-col min-w-full items-center md:flex-row md:justify-between">
                <div>
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="..."
                            width={200}
                            className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="my-4 md:my-0">
                    <ul className="flex flex-col md:flex-row md:space-x-8 md:space-y-0 ">
                        {navbarItems.map((item, index) => {
                            const isActive = pathname === item.url;
                            return (
                                <li
                                    key={index}
                                    className={`flex items-center space-x-2 transition-colors duration-300 ${
                                        isActive
                                            ? "text-primary font-bold"
                                            : "hover:text-primary"
                                    }`}
                                >
                                    <Icon
                                        icon={item.icon}
                                        width={24}
                                        height={24}
                                    />
                                    <Link href={item.url}>{item.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex space-x-4 items-center mt-4 md:mt-0">
                    <DropdownLanguages />
                    <ToggleMode />
                    <Link href="/login">
                        <button className="px-8 py-2 text-white bg-primary rounded-md">
                            Login
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
