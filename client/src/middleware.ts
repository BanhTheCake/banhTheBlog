import jwt_decode from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import verifyRefreshToken from './lib/Utils/verifyRefreshToken';
import { RefreshToken } from './lib/Types/Token';
import { Roles } from './lib/Types/User';

const checkRole = (roles: Roles[], value: Roles) => {
    return roles.some((role) => role === value);
};

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const rfToken = request.cookies.get('refreshToken')?.value;

    if (!rfToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const isAllow = await verifyRefreshToken(rfToken);

    if (!isAllow) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const dataToken = jwt_decode<RefreshToken>(rfToken);

    const isAdminRoutes = ['/blog/create', '/blog/update'].some((route) =>
        route.includes(pathname)
    );

    if (isAdminRoutes) {
        const isAccept = checkRole([Roles.ADMIN], dataToken.role);
        if (!isAccept) {
            return NextResponse.redirect(new URL('/404', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/me/:path*', '/blog/create', '/blog/update', '/settings/:path*'],
};
