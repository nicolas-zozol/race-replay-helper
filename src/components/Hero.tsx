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
import { Separator } from "@/components/ui/separator";

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

  const handleGoogleSignup = () => {
    // This would be connected to your authentication service
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
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Sign up for SMS updates</DialogTitle>
                <DialogDescription>
                  Get instant race ratings on your phone. Free trial starts with the new season!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Button onClick={handleGoogleSignup} variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Enter your email (required)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={() => handleSubmit("SMS")} className="w-full">
                  Register - Start Free Trial
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
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Connect via Telegram</DialogTitle>
                <DialogDescription>
                  Get instant race updates on Telegram. Free trial starts with the new season!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Button onClick={handleGoogleSignup} variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <Input
                  type="text"
                  placeholder="@yourtelegramhandle"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Enter your email (required)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={() => handleSubmit("Telegram")} className="w-full">
                  Register - Start Free Trial
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
                  Get race ratings and updates directly in your inbox.
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