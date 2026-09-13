import { redirect } from "next/navigation";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  if (params?.locale && params.locale.toLowerCase().includes("franzkopp")) {
    redirect("/franzkopp");
  }
  return <>{children}</>;
}
