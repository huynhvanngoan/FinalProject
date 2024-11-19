// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//     // Match only internationalized pathnames
//     matcher: ["/", "/(vi|en)/:path*"],
// };

const isLoggedIn: boolean = false;

import { NextResponse } from "next/server";
export function middleware(request: Request) {
  if (!isLoggedIn) {
    return NextResponse.redirect("/login");
  }
  return NextResponse.next();
}
