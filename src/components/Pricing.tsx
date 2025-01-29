import { Check } from "lucide-react";

export const Pricing = () => {
  const plans = [
    {
      name: "Monthly Pass",
      price: "$7",
      period: "/month",
      features: [
        "One-month free trial",
        "Race notifications",
        "SMS & Telegram support",
        "Cancel anytime",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Season Pass",
      price: "$35",
      period: "/season",
      features: [
        "One-month free trial",
        "Full season coverage",
        "SMS & Telegram support",
        "Safe for kids mode",
        "Real-time updates",
        "Multiple racing series",
      ],
      cta: "Best Value - Get Started",
      popular: true,
    },
  ];

  return (
    <section className="py-20 px-4 bg-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-muted">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                plan.popular
                  ? "bg-primary hover:bg-primary-hover text-white"
                  : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};