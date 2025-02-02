import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { NotificationButtons } from "./hero/NotificationButtons";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [showFullSMSForm, setShowFullSMSForm] = useState(false);
  const [showFullTelegramForm, setShowFullTelegramForm] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = (type: string) => {
    toast({
      title: "Success!",
      description: `We'll send you race updates via ${type}. Your data is secure and will never be shared.`,
    });
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Google Sign Up",
      description: "Connecting to Google... Your free trial will start when the season begins!",
    });
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-light py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1626059888351-1d1b62e5d7f0')] bg-cover bg-center" />
      <div className="max-w-4xl mx-auto text-center animate-fadeIn relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
          {t("hero.title")}
          <br />
          <span className="text-primary">{t("hero.subtitle")}</span>
        </h1>
        <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
          {t("hero.description")}
        </p>
        <NotificationButtons
          phoneNumber={phoneNumber}
          telegram={telegram}
          email={email}
          setPhoneNumber={setPhoneNumber}
          setTelegram={setTelegram}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
          handleGoogleSignup={handleGoogleSignup}
          showFullSMSForm={showFullSMSForm}
          setShowFullSMSForm={setShowFullSMSForm}
          showFullTelegramForm={showFullTelegramForm}
          setShowFullTelegramForm={setShowFullTelegramForm}
        />
      </div>
    </section>
  );
};