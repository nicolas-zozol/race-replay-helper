
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Benefits } from "@/components/Benefits";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen">
      <div className="w-full max-w-md mx-auto mt-4 px-4">
        <Link to="/dashboard">
          <Button className="w-full" size="lg">
            View Demo Dashboard
            <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
      <Hero />
      <HowItWorks />
      <Pricing />
      <Benefits />
      <FAQ />
    </main>
  );
};

export default Index;
