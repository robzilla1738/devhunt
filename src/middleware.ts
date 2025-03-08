import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Handle proper redirects if needed
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Match all paths except static files and api routes that are handled separately
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 