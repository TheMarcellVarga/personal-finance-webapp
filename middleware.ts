import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === "/" || 
    path === "/pricing" || 
    path.startsWith("/calculator") || 
    path.startsWith("/auth");
  
  // Get the token from the cookies
  const isAuthenticated = request.cookies.has("__session");
  
  // Redirect authenticated users from public routes to dashboard
  if (isAuthenticated && path === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // Redirect unauthenticated users to auth page if they try to access protected routes
  if (!isAuthenticated && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
  ],
};