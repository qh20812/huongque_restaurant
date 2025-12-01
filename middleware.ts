import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin route
  if (pathname.startsWith("/admin")) {
    // Check if hq_token cookie exists
    const token = request.cookies.get("hq_token")?.value;
    
    console.log('[Middleware] Path:', pathname);
    console.log('[Middleware] Token present:', !!token);

    // If no token, redirect to login
    if (!token) {
      console.log('[Middleware] No token found, redirecting to login');
      const loginUrl = new URL("/dang-nhap", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token by calling the session API (which runs in Node.js runtime)
    try {
      const sessionUrl = new URL("/api/auth/session", request.url);
      const sessionRes = await fetch(sessionUrl, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (!sessionRes.ok) {
        console.log('[Middleware] Session verification failed, redirecting to login');
        const loginUrl = new URL("/dang-nhap", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }

      const session = await sessionRes.json();
      
      // Check if user has admin role
      if (session.user?.role !== "admin") {
        console.log('[Middleware] User is not admin, redirecting to home');
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
      }

      // User is authenticated and has admin role, allow access
      console.log('[Middleware] ✓ Admin access granted for user:', session.user.id);
      return NextResponse.next();
    } catch (err) {
      console.error("[Middleware] Error verifying session:", err);
      const loginUrl = new URL("/dang-nhap", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
