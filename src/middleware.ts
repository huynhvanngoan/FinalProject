import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const locale =
        req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ||
        routing.defaultLocale;
    const sessionToken = req.cookies.get("sessionToken")?.value;

    // Đường dẫn không cho phép khi đã đăng nhập
    const restrictedPathsForLoggedIn = [
        `/${locale}/login`,
        `/${locale}/register`,
    ];

    // Chuyển hướng nếu đã đăng nhập và truy cập trang login hoặc register
    if (sessionToken && restrictedPathsForLoggedIn.includes(pathname)) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
    }

    // Danh sách các đường dẫn yêu cầu xác thực
    const protectedPaths = [
        `/${locale}/dashboard`,
        `/${locale}/dashboard/:path*`,
    ];

    // Kiểm tra nếu người dùng chưa đăng nhập nhưng truy cập các đường dẫn yêu cầu xác thực
    const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path.replace(":path*", ""))
    );

    if (isProtected && !sessionToken) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    // Áp dụng middleware quốc tế hóa cho tất cả các đường dẫn còn lại
    return intlMiddleware(req);
}

export const config = {
    matcher: [
        "/", // Trang chủ
        "/dashboard", // Bảng điều khiển
        "/dashboard/:path*", // Các đường dẫn con của bảng điều khiển
        "/(vi|en)/:path*", // Các đường dẫn quốc tế hóa
    ],
};
