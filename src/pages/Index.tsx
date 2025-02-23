
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Benefits } from "@/components/Benefits";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const Index = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="min-h-screen">
      {session && (
        <div className="w-full max-w-md mx-auto mt-4 px-4">
          <Link to="/dashboard">
            <Button className="w-full" size="lg">
              Go to Dashboard
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      )}
      <Hero />
      <HowItWorks />
      <Pricing />
      <Benefits />
      <FAQ />
    </main>
  );
};

export default Index;
