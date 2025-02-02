import { Users, Bell, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: t("howItWorks.steps.community.title"),
      description: t("howItWorks.steps.community.description"),
    },
    {
      icon: <Bell className="w-12 h-12 text-primary" />,
      title: t("howItWorks.steps.notifications.title"),
      description: t("howItWorks.steps.notifications.description"),
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: t("howItWorks.steps.enjoy.title"),
      description: t("howItWorks.steps.enjoy.description"),
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          {t("howItWorks.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">
                {step.title}
              </h3>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};