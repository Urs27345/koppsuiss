import Header from "../../components/module/header";
import Footer from "../../components/module/footer";
import HeaderNavigation from "../../components/module/headerNavigation";
import { getDictionary } from "../../lib/getDictionary";
import { MyContextProvider } from "../context/context";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const dict = await getDictionary(params.locale);
  return (
    <>
      <Header />
      <MyContextProvider>
        <HeaderNavigation dict={dict} locale={params.locale} />
        {children}
        <Footer />
      </MyContextProvider>
    </>
  );
}
