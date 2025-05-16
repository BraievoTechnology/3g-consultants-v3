// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdmin = request.cookies.get('admin-auth')?.value === 'true';

    if (!isAdmin && request.nextUrl.pathname.startsWith('/admin/secure')) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

// Add config to apply middleware only to specific paths
export const config = {
    matcher: ['/admin/secure/:path*'],
};
