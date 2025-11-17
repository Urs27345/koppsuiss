import HeroSection from "../components/pages/home/hero";
import HomeContent from "../components/pages/home/HomeContent";
import { getDictionary } from "../lib/getDictionary";

// This page now serves content directly for Google Ads compatibility
export default async function RootPage() {
  // Default to Spanish content for the root page
  const dict = await getDictionary("es");
  return (
    <div>
      <HeroSection />
      <HomeContent dict={dict} />
    </div>
  );
}
