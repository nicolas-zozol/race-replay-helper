import { Users, Bell, Clock } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Our community rates the race",
      description: "Real F1 fans provide authentic ratings right after each race",
    },
    {
      icon: <Bell className="w-12 h-12 text-primary" />,
      title: "Get instant notifications",
      description: "Receive race ratings via your preferred channel",
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "Save time, enjoy the best",
      description: "Only watch the races worth your time",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};