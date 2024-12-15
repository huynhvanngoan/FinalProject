"use client";

import React, { useState } from "react";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SidebarItems } from "@/utils/config";
import ToggleMode from "../shared/ToggleMode";
import DropdownLanguages from "../shared/DropdownLanguages";
import Image from "next/image";
import Logo from "@/public/Logo.svg";

export default function TopNav() {
    const sidebarItems = SidebarItems();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-secondary w-full flex items-center h-20 px-4 border-b shrink-0 md:px-6 justify-between">
            <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
                prefetch={false}
            >
                <Image
                    src={Logo}
                    alt="..."
                    width={200}
                    className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                />
            </Link>

            <div className="ml-4 flex items-center gap-3">
                <ToggleMode />
                <DropdownLanguages />
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
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <button
                    onClick={() => setIsOpen(true)}
                    className="block sm:hidden"
                >
                    <Menu size={24} />
                </button>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetContent side="right" className="block md:hidden">
                        <div className="pt-4  overflow-y-auto h-fit w-full flex flex-col gap-1">
                            {sidebarItems.map((navItem, idx) => (
                                <Link
                                    key={idx}
                                    href={navItem.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                                        navItem.active
                                            ? "font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white"
                                            : "hover:bg-neutral-200  hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                                    }`}
                                >
                                    <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                                        {navItem.icon}
                                        <span>{navItem.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
