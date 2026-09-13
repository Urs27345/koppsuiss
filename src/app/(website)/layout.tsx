import React from "react";
import Header from "@/components/module/header";
import Footer from "@/components/module/footer";
import HeaderNavigation from "@/components/module/headerNavigation";
import { getDictionary } from "@/lib/getDictionary";

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary("es");

  return (
    <>
      <Header />
      <HeaderNavigation dict={dict} locale="es" />
      {children}
      <Footer />
    </>
  );
}
