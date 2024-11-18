"use client";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { languages } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation"; // Import to access the current path

const DropdownLanguages = () => {
    const t = useTranslations("HomePage");
    const router = useRouter();
    const pathname = usePathname(); // Get the current path
    const searchParams = useSearchParams(); // Get the current search parameters

    const changeLanguage = (locale: string) => {
        // Get the current search params
        const currentSearch = searchParams.toString();

        // Update the router path, keeping the current path and appending the language
        // If your app's routing structure uses locale in the path, you can adjust accordingly
        router.push(
            `/${locale}${pathname.substring(3)}${
                currentSearch ? `?${currentSearch}` : ""
            }`
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Icon icon="mingcute:earth-2-line" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t("languages")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        className="cursor-pointer"
                        onClick={() => changeLanguage(lang.code)}
                    >
                        <Icon icon={`${lang.flag}`} /> {t(`${lang.code}`)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownLanguages;
