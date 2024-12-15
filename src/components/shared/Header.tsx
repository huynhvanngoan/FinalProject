/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ToggleMode from "./ToggleMode";
import DropdownLanguages from "./DropdownLanguages";
import Image from "next/image";
import Logo from "@/public/Logo.svg";
import { navbarItems } from "@/utils/constants";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import SearchBox from "./SearchBox";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
    const t = useTranslations("HomePage");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    let menuClasses: string[] = [];

    const getMenuClasses = () => {
        if (isOpen) {
            menuClasses = [
                "flex",
                "flex-col",
                "absolute",
                "top-[65px]",
                "bg-secondary",
                "w-full",
                "pt-5",
                "pb-10",
                "px-20",
                "left-0",
                "gap-10",
                "item-center",
                "justify-center",
            ];
        } else {
            menuClasses = [
                "hidden",
                " md:flex",
                " md:flex-row",
                "md:space-y-0",
                "md:space-x-8 md:space-y-0",
            ];
        }

        return menuClasses.join(" ");
    };
    const handleResize = () => {
        if (window.innerWidth > 768 && isOpen) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    useEffect(() => {
        const currentIndex = navbarItems.findIndex(
            (item) =>
                pathname === `/${locale}${item.url}` ||
                pathname === item.url ||
                (item.url === "/destination" &&
                    pathname.includes("/destination")) ||
                (item.url === "/blog" && pathname.includes("/blog")) ||
                (item.url === "/our-tour" && pathname.includes("/our-tour"))
        );

        // If no index found, set to 0
        setActiveIndex(currentIndex !== -1 ? currentIndex : 0);
    }, [pathname, locale]);
    return (
        <header className="w-full bg-secondary py-4 md:p-4 shadow-md sticky top-0 z-30">
            <nav className=" relative flex min-w-full items-center flex-row justify-evenly">
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
                <div className=" my-4 md:my-0">
                    <ul className={getMenuClasses()}>
                        {navbarItems.map((item, index) => (
                            <li
                                key={index}
                                className={`flex items-center text-nowrap space-x-2 transition-colors duration-300 ${
                                    activeIndex === index
                                        ? "text-primary font-bold"
                                        : "hover:text-primary"
                                }`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <Icon icon={item.icon} width={24} height={24} />
                                <Link href={`/${locale}${item.url}`}>
                                    {t(`${item.title}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mx-4 hidden sm:block">
                    <SearchBox />
                </div>
                <div className="flex space-x-4 items-center ">
                    <DropdownLanguages />
                    <ToggleMode />
                    {/* <Link href={`/${locale}/login`}>
                        <Button className="flex items-center p-4 text-white text-base bg-primary rounded-full">
                            <Icon icon="iconoir:user" />
                            <span>{t("login")}</span>
                        </Button>
                    </Link> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={`/${locale}/profile`}>Profile</Link>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="md:hidden flex items-center mx-2">
                    <Button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <Icon icon="mi:menu" />
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
