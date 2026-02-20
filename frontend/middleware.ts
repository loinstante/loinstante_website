import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Lightweight guard: check for the presence of the session cookie
  // set by the Rust backend. Actual JWT + DB session validation
  // happens server-side when the page calls /api/me.
  const sessionCookie = request.cookies.get('session')?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected-route/:path*'],
};