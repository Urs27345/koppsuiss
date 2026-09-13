import { NextRequest, NextResponse } from "next/server";
import { GALLERY_COOKIE_NAME, DEFAULT_GALLERY_PASSWORD, generateSessionToken } from "@/lib/gallery-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ success: false, message: "Passwort erforderlich." }, { status: 400 });
    }

    if (password.trim() !== "archiv" && password.trim() !== DEFAULT_GALLERY_PASSWORD.trim()) {
      return NextResponse.json(
        { success: false, message: "Ungültiges Passwort. Bitte überprüfen Sie Ihre Eingabe." },
        { status: 401 },
      );
    }

    const token = generateSessionToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(GALLERY_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, message: "Serverfehler bei der Authentifizierung." }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Abgemeldet." });
  response.cookies.delete(GALLERY_COOKIE_NAME);
  return response;
}
