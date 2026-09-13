import { notFound } from "next/navigation";
import HeroSection from "@/components/pages/home/hero";
import HomeContent from "@/components/pages/home/HomeContent";
import { getDictionary } from "@/lib/getDictionary";

const VALID_LOCALES = ["es", "de", "en"];

export default async function Home({ params }: { params: { locale: string } }) {
  if (!VALID_LOCALES.includes(params.locale)) {
    notFound();
  }
  const dict = await getDictionary(params.locale);
  return (
    <div>
      <HeroSection />
      <HomeContent dict={dict} />
    </div>
  );
}
