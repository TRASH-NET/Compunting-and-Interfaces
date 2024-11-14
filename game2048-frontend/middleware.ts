import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from './models/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
        return NextResponse.next();
    }

    const hasToken = request.cookies.has('authentication');

    if (!hasToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const token = request.cookies.get('authentication') || undefined;

    if (token) {
        const validToken = await verifyToken(token.value);
        if (validToken.statusCode === 401 || validToken.error === 'Unauthorized' || validToken.message === 'Invalid Token') {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/game',],
}