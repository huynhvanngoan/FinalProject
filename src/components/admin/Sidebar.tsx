/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { SidebarItems } from "@/utils/config";
import { Icon } from "@iconify/react";
import React, { Fragment, useEffect, useState } from "react";
import { SideNavItem } from "./SidebarItems";
import { Button } from "../ui/button";

const Sidebar = () => {
    const sideBarItems = SidebarItems();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = window.localStorage.getItem("sidebarExpanded");
            if (saved === null) return true;
            return JSON.parse(saved);
        }
        return true;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(
                "sidebarExpanded",
                JSON.stringify(isSidebarExpanded)
            );
        }
    }, [isSidebarExpanded]);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    return (
        <div className="h-[calc(100vh-5rem)] relative">
            <div
                className={cn(
                    isSidebarExpanded ? "w-[200px]" : "w-[68px]",
                    "transition-all duration-300 ease-in-out transform hidden sm:block h-full bg-secondary border-r"
                )}
            >
                <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden">
                    {/* Top section */}
                    <div className="flex-1 py-4">
                        <div className="flex flex-col space-y-6">
                            {sideBarItems
                                .filter((item) => item.position === "top")
                                .map((item, idx) => (
                                    <Fragment key={idx}>
                                        <div className="space-y-4 text-xl hover:bg-primary-foreground">
                                            <SideNavItem
                                                label={item.name}
                                                icon={item.icon}
                                                path={item.href}
                                                active={item.active}
                                                isSidebarExpanded={
                                                    isSidebarExpanded
                                                }
                                            />
                                        </div>
                                    </Fragment>
                                ))}
                        </div>
                    </div>

                    {/* Bottom section */}
                    {/* <div className="py-4">
                        {sideBarItems
                            .filter((item) => item.position === "bottom")
                            .map((item, idx) => (
                                <Fragment key={idx}>
                                    <div className="space-y-1">
                                        <SideNavItem
                                            label={item.name}
                                            icon={item.icon}
                                            path={item.href}
                                            active={item.active}
                                            isSidebarExpanded={
                                                isSidebarExpanded
                                            }
                                        />
                                    </div>
                                </Fragment>
                            ))}
                    </div> */}
                </aside>
            </div>

            {/* Toggle button */}
            <Button
                className="absolute -right-3 top-20 transform -translate-y-1/2 flex h-6 w-6 items-center justify-center border border-muted-foreground/20 rounded-full bg-accent shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                onClick={toggleSidebar}
            >
                <Icon
                    icon={
                        isSidebarExpanded
                            ? "mdi:chevron-left"
                            : "mdi:chevron-right"
                    }
                    className="text-foreground text-base"
                />
            </Button>
        </div>
    );
};
export default Sidebar