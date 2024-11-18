import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getLocalizedUrl = (url: string, locale: string) => {
    const languageCode = locale || "en";
    return `/${languageCode}${url}`;
};
