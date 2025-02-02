import { Clock, Bell, MessageSquare, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Benefits = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: t("benefits.items.time.title"),
      description: t("benefits.items.time.description"),
    },
    {
      icon: <Bell className="w-8 h-8 text-primary" />,
      title: t("benefits.items.informed.title"),
      description: t("benefits.items.informed.description"),
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: t("benefits.items.updates.title"),
      description: t("benefits.items.updates.description"),
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: t("benefits.items.family.title"),
      description: t("benefits.items.family.description"),
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          {t("benefits.title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">
                {benefit.title}
              </h3>
              <p className="text-muted">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};