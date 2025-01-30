import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Benefits } from "@/components/Benefits";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Pricing />
      <Benefits />
      <FAQ />
    </main>
  );
};

export default Index;