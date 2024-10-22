"use client"
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

const DropdownLanguages = () => {
    const t = useTranslations("HomePage");
    const router = useRouter();
    const changeLanguage = (locale: string) => {
        router.push(`/${locale}`);
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
