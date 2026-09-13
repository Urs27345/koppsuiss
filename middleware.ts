import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lowerPath = pathname.toLowerCase();

  if (lowerPath.includes("franzkopp")) {
    if (pathname !== "/franzkopp") {
      const redirectUrl = new URL("/franzkopp", request.url);
      return NextResponse.redirect(redirectUrl, 308);
    }

    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|media|api).*)"],
};
