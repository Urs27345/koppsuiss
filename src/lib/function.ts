export function replaceLocale(pathname: string, newLocale: string): string {
  const segments = pathname.split("/");
  if (segments[1]) {
    segments[1] = newLocale; // replace locale part
  } else {
    segments.push(newLocale); // e.g., when pathname is "/"
  }
  return segments.join("/");
}
