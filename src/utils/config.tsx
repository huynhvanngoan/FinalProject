import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react"; // Import Iconify

export const SidebarItems = () => {
    const pathname = usePathname();

    function isNavItemActive(pathname: string, nav: string) {
        return pathname.includes(nav);
    }

    return [
        {
            name: "Statistics",
            href: "/dashboard",
            icon: (
                <Icon icon="mage:dashboard-chart-star" width={28} height={28} />
            ), 
            active: pathname === "/dashboard",
            position: "top",
        },
        {
            name: "Tours",
            href: "/dashboard/tours",
            icon: <Icon icon="mdi:airplane-takeoff" width={28} height={28} />,
            active: isNavItemActive(pathname, "/dashboard/tours"),
            position: "top",
        },
        {
            name: "Destinations",
            href: "/dashboard/destinations",
            icon: <Icon icon="mdi:map-marker" width={28} height={28} />,
            active: isNavItemActive(pathname, "/dashboard/destinations"),
            position: "top",
        },
        {
            name: "Bookings",
            href: "/dashboard/bookings",
            icon: (
                <Icon
                    icon="fluent:calendar-checkmark-20-filled"
                    width={28}
                    height={28}
                />
            ),
            active: isNavItemActive(pathname, "/dashboard/bookings"),
            position: "top",
        },
        {
            name: "Users",
            href: "/dashboard/users",
            icon: <Icon icon="carbon:user-profile" width={28} height={28} />,
            active: isNavItemActive(pathname, "/dashboard/users"),
            position: "top",
        },
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: <Icon icon="mdi:cog" width={28} height={28} />,
            active: isNavItemActive(pathname, "/dashboard/settings"),
            position: "bottom",
        },
    ];
};
