import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  if (pathname.toLowerCase().includes("franzkopp-7f4k9m2x")) {
    url.pathname = pathname.replace(/FranzKopp-7f4k9m2x/i, "franzkopp");
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();

  if (pathname.toLowerCase().includes("franzkopp")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  }

  return response;
}

export const config = {
  matcher: [
    "/franzkopp/:path*",
    "/:locale/franzkopp/:path*",
    "/FranzKopp-7f4k9m2x/:path*",
    "/:locale/FranzKopp-7f4k9m2x/:path*",
  ],
};
