/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["var(--font-poppins)", ...fontFamily.sans],
                poppinsBold: ["var(--font-poppins-bold)", ...fontFamily.sans],
                sacramento: ["var(--font-sacramento)", "cursive"],
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            spacing: {
                18: "4.5rem",
                30: "7.5rem",
                36: "9rem",
                72: "18rem",
            },
            screens: {
                mobile: "425px",
                xs: "630px",
                sm: "768px",
                md: "1024px",
                lg: "1280px",
                xl: "1440px",
                xxl: "1920px",
                "4k": "2560px",
            },
            zIndex: {
                "-1": "-1",
                60: "60",
                70: "70",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        function ({
            addUtilities,
        }: {
            addUtilities: (utilities: Record<string, any>) => void;
        }) {
            addUtilities({
                // Flex utilities
                ".flex-center": {
                    display: "flex",
                    "justify-content": "center",
                    "align-items": "center",
                },
                ".flex-between": {
                    display: "flex",
                    "justify-content": "space-between",
                    "align-items": "center",
                },
                ".flex-around": {
                    display: "flex",
                    "justify-content": "space-around",
                    "align-items": "center",
                },
                ".flex-start": {
                    display: "flex",
                    "justify-content": "flex-start",
                    "align-items": "center",
                },
                ".flex-end": {
                    display: "flex",
                    "justify-content": "flex-end",
                    "align-items": "center",
                },

                // Grid utilities
                ".grid-2": {
                    display: "grid",
                    "grid-template-columns": "repeat(2, minmax(0, 1fr))",
                    gap: "1rem",
                },
                ".grid-3": {
                    display: "grid",
                    "grid-template-columns": "repeat(3, minmax(0, 1fr))",
                    gap: "1rem",
                },
                ".grid-4": {
                    display: "grid",
                    "grid-template-columns": "repeat(4, minmax(0, 1fr))",
                    gap: "1rem",
                },
                ".grid-auto": {
                    display: "grid",
                    "grid-template-columns":
                        "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                },
                ".grid-responsive": {
                    display: "grid",
                    "grid-template-columns":
                        "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                },

                // Additional utilities
                ".text-shadow": {
                    "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.3)",
                },
                ".no-scrollbar": {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                ".transition-all-fast": {
                    transition: "all 0.2s ease-in-out",
                },
                ".container": {
                    "@apply flex flex-col gap-y-20 p-10 lg:p-16 xl:p-24": {},
                },
            });
        },
    ],
};

export default config;
