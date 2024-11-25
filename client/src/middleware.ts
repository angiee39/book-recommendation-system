import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');
    // console.log(token)
    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
    return NextResponse.next();
}
export const config = {
    // matcher: ['/account', '/books', '/reviews'],
    matcher: ['/account/:path*', '/books/:path*', '/reviews/:path*'],
};
