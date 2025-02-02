import { Check, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

export const Pricing = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("pricing.monthly.name"),
      price: t("pricing.monthly.price"),
      period: t("pricing.monthly.period"),
      features: t("pricing.monthly.features", { returnObjects: true }),
      cta: t("pricing.monthly.cta"),
      popular: false,
    },
    {
      name: t("pricing.season.name"),
      price: t("pricing.season.price"),
      period: t("pricing.season.period"),
      features: t("pricing.season.features", { returnObjects: true }),
      cta: t("pricing.season.cta"),
      popular: true,
    },
    {
      name: t("pricing.pro.name"),
      price: t("pricing.pro.price"),
      period: t("pricing.pro.period"),
      features: [
        {
          text: t("pricing.pro.features.all"),
          info: t("pricing.pro.info.all"),
        },
        {
          text: t("pricing.pro.features.safe"),
          info: t("pricing.pro.info.safe"),
        },
        {
          text: t("pricing.pro.features.instant"),
          info: t("pricing.pro.info.instant"),
        },
        {
          text: t("pricing.pro.features.competitions"),
          info: t("pricing.pro.info.competitions"),
        },
        {
          text: t("pricing.pro.features.skip"),
          info: t("pricing.pro.info.skip"),
        },
      ],
      cta: t("pricing.pro.cta"),
      popular: false,
      disabled: true,
    },
  ];

  return (
    <section className="py-20 px-4 bg-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          {t("pricing.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 shadow-lg animate-fadeIn ${
                plan.popular ? "border-2 border-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-secondary mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-secondary">{plan.price}</span>
                <span className="text-muted ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {Array.isArray(plan.features) ? (
                  plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-muted">
                      <Check className="w-5 h-5 text-primary mr-2" />
                      {typeof feature === "string" ? (
                        feature
                      ) : (
                        <div className="flex items-center gap-2">
                          {feature.text}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-4 h-4 text-muted hover:text-primary transition-colors" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{feature.info}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </li>
                  ))
                ) : null}
              </ul>
              <button
                className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? "bg-primary hover:bg-primary-hover text-white"
                    : plan.disabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
                disabled={plan.disabled}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};