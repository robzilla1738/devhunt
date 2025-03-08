import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // These paths are always accessible
  const publicPaths = ['/', '/auth/signin', '/auth/signup', '/api/auth', '/news', '/projects'];
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // API paths that don't need authentication (GET requests to public data)
  const isPublicApiPath = (
    pathname.startsWith('/api/projects') && request.method === 'GET' ||
    pathname.startsWith('/api/news') && request.method === 'GET' ||
    pathname.startsWith('/api/forum') && request.method === 'GET'
  );

  // Check if path requires authentication
  if (isPublicPath || isPublicApiPath) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = await getToken({ req: request });
  
  // If no token and trying to access protected routes, redirect to login
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Match all paths except static files and assets
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 