import { MessageSquare, Mail, Send } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-light py-20 px-4">
      <div className="max-w-4xl mx-auto text-center animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
          Skip the boring races.
          <br />
          <span className="text-primary">We'll tell you if it's worth the replay!</span>
        </h1>
        <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
          Get instant race ratings via SMS or Telegram notification. Never waste time on a dull race again.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            <MessageSquare className="w-5 h-5" />
            Sign up for SMS
          </button>
          <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            <Send className="w-5 h-5" />
            Get Telegram notifications
          </button>
          <button className="flex items-center justify-center gap-2 border-2 border-muted text-muted hover:border-primary hover:text-primary px-8 py-4 rounded-lg font-semibold transition-colors">
            <Mail className="w-5 h-5" />
            Email updates
          </button>
        </div>
      </div>
    </section>
  );
};