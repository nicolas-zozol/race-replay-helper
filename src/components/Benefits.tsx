import { Clock, Bell, MessageSquare, Shield } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Save Time",
      description: "No more wasting hours on dull races",
    },
    {
      icon: <Bell className="w-8 h-8 text-primary" />,
      title: "Stay Informed",
      description: "Be the first to know if it's a thrilling race",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Flexible Updates",
      description: "Choose between SMS or Telegram notifications",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Watch in Family",
      description: "Avoid dramatic moments with our safe mode for kids",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">{benefit.title}</h3>
              <p className="text-muted">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};