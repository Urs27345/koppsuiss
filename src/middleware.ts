import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cleanPath = pathname.replace(/\/$/, "");

  if (cleanPath === "/franzkopp") {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
    return response;
  }

  if (cleanPath.toLowerCase().includes("franzkopp")) {
    const redirectUrl = new URL("/franzkopp", request.url);
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|media|api).*)"],
};
