/* eslint-disable @typescript-eslint/no-explicit-any */
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//     // Match only internationalized pathnames
//     matcher: ["/", "/dashboard", "/(vi|en)/:path*"],
// };

import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: any) {
    const { pathname } = req.nextUrl;

    // Nếu đường dẫn là /dashboard mà không có locale
    if (pathname === "/dashboard") {
        const locale =
            req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ||
            routing.defaultLocale;
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
    }

    // Gọi middleware quốc tế hóa
    return intlMiddleware(req);
}

export const config = {
    matcher: [
        // Tất cả các đường dẫn cần áp dụng middleware
        "/",
        "/dashboard",
        "/dashboard/:path*",
        "/(vi|en)/:path*",
    ],
};

/* 
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    // Áp dụng middleware của `next-intl` trước
    const response = intlMiddleware(req);

    // Lấy token từ cookies (hoặc từ header Authorization nếu cần)
    const token = req.cookies.get("auth-token");

    // Danh sách các đường dẫn yêu cầu xác thực
    const protectedPaths = ["/dashboard", "/user/profile", "/user/booking"];
    const pathname = req.nextUrl.pathname;

    // Kiểm tra nếu đường dẫn cần xác thực mà token không tồn tại
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
    if (isProtected && !token) {
        const locale = req.nextUrl.pathname.startsWith("/vi") ? "vi" : "en"; // Lấy locale hiện tại
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    // Nếu không có vấn đề, trả về response bình thường
    return response;
}

export const config = {
    matcher: ["/", "/(vi|en)/:path*"], // Áp dụng cho các đường dẫn quốc tế hóa
};
 */
