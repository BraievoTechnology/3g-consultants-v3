/*
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow access to login page
    if (pathname === "/admin" || pathname === "/admin/page" || pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    // Protect /admin/secure/!**
    if (pathname.startsWith("/admin/secure")) {
        const isAdminAuth = request.cookies.get("admin-auth")?.value;

        if (isAdminAuth !== "true") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
*/
