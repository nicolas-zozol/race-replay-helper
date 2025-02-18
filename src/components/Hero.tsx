
import { useTranslation } from "react-i18next";
import { NotificationButtons } from "./hero/NotificationButtons";

export const Hero = () => {
  const { t } = useTranslation();

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
        <NotificationButtons />
      </div>
    </section>
  );
};
