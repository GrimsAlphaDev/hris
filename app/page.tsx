import Footer from "@/components/landing_page/Footer";
import HeroSection from "@/components/landing_page/HeroSection";
import Service from "@/components/landing_page/Service";
import Support from "@/components/landing_page/Support";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navMenu } from "@/data/navMenu";

export default function Home() {
  return (
    <main className="dark:bg-black bg-white w-full h-full">
      <FloatingNav navItems={navMenu} />
      <HeroSection />
      <Service />
      <Support />
      <Footer />
    </main>
  );
}
