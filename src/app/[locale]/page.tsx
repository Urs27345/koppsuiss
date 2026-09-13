import HeroSection from "../../components/pages/home/hero";
import HomeContent from "../../components/pages/home/HomeContent";
import { getDictionary } from "../../lib/getDictionary";

export default async function Home({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale);
  return (
    <div>
      <HeroSection />
      <HomeContent dict={dict} />
    </div>
  );
}
