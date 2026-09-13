import { notFound } from "next/navigation";

const VALID_LOCALES = ["es", "de", "en"];

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  if (params?.locale && !VALID_LOCALES.includes(params.locale)) {
    notFound();
  }
  return <>{children}</>;
}
