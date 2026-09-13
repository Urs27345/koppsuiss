import HeroSection from "../../components/pages/home/hero";
import HomeContent from "../../components/pages/home/HomeContent";
import { getDictionary } from "../../lib/getDictionary";
import FranzKoppPage from "../FranzKopp-7f4k9m2x/page";

export default async function Home({ params }: { params: { locale: string } }) {
  if (params.locale === "FranzKopp-7f4k9m2x") {
    return <FranzKoppPage />;
  }

  const dict = await getDictionary(params.locale);
  return (
    <div>
      <HeroSection />
      <HomeContent dict={dict} />
    </div>
  );
}
