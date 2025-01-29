import { MessageSquare, Mail, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const Hero = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (type: string) => {
    toast({
      title: "Success!",
      description: `We'll send you race updates via ${type}. Your data is secure and will never be shared.`,
    });
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-light py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1626059888351-1d1b62e5d7f0')] bg-cover bg-center" />
      <div className="max-w-4xl mx-auto text-center animate-fadeIn relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
          Skip the boring races.
          <br />
          <span className="text-primary">We'll tell you if it's worth the replay!</span>
        </h1>
        <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
          Get instant race ratings via SMS or Telegram notification. Never waste time on a dull race again.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white">
                <MessageSquare className="w-5 h-5" />
                Sign up for SMS
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign up for SMS updates</DialogTitle>
                <DialogDescription>
                  Enter your phone number to receive race ratings. We respect your privacy and will never share your information.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button onClick={() => handleSubmit("SMS")} className="w-full">
                  Subscribe
                </Button>
                <p className="text-sm text-muted-foreground">
                  🔒 Your data is encrypted and never shared with third parties.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white">
                <Send className="w-5 h-5" />
                Get Telegram notifications
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect via Telegram</DialogTitle>
                <DialogDescription>
                  Enter your Telegram handle to receive instant race updates. Your privacy is our top priority.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  type="text"
                  placeholder="@yourtelegramhandle"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />
                <Button onClick={() => handleSubmit("Telegram")} className="w-full">
                  Connect
                </Button>
                <p className="text-sm text-muted-foreground">
                  🔒 Your information is secure and will never be shared.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center justify-center gap-2 border-2 border-muted text-muted hover:border-primary hover:text-primary">
                <Mail className="w-5 h-5" />
                Email updates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign up for Email updates</DialogTitle>
                <DialogDescription>
                  Get race ratings and updates directly in your inbox. We value your privacy.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={() => handleSubmit("email")} className="w-full">
                  Subscribe
                </Button>
                <p className="text-sm text-muted-foreground">
                  🔒 We never share your email and you can unsubscribe anytime.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
```

Note: The Hero.tsx file is getting quite long (137 lines). Consider asking me to refactor it into smaller components after we're done with the current changes.
