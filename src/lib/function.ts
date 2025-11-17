export function replaceLocale(pathname: string, newLocale: string): string {
  const segments = pathname.split("/");
  if (pathname === "/") {
    return `/${newLocale}`;
  }

  // Handle locale paths like /es, /es/page, etc.
  if (segments.length >= 2 && segments[1]) {
    segments[1] = newLocale; // replace locale part
    return segments.join("/");
  }

  // Fallback - shouldn't happen in normal usage
  return `/${newLocale}`;
}
