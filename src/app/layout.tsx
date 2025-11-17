import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MyContextProvider } from "./context/context";
import { getDictionary } from "../lib/getDictionary";
import Header from "../components/module/header";
import Footer from "../components/module/footer";
import HeaderNavigation from "../components/module/headerNavigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const jost = localFont({
  src: [
    {
      path: "./fonts/Jost/static/Jost-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Jost/static/Jost-Medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/Jost/static/Jost-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./fonts/Jost/static/Jost-Bold.ttf",
      weight: "700",
    },
    {
      path: "./fonts/Jost/static/Jost-ExtraBold.ttf",
      weight: "900",
    },
  ],
  display: "swap",
  variable: "--font-Jost",
  preload: true,
});

export const metadata: Metadata = {
  title: "koppsuisse",
  description: "Luxury apartments in Santa Cruz with pool, sauna and solar panels. Buy direct from the developer.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Load Spanish dictionary by default for Google Ads compatibility
  const dict = await getDictionary("es");

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${jost.className} antialiased`}>
        <MyContextProvider>
          <Header />
          <HeaderNavigation dict={dict} locale="es" />
          {children}
          <Footer />
        </MyContextProvider>
      </body>
    </html>
  );
}
