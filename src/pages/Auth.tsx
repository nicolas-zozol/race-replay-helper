
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flag } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CountryCode {
  name: string;
  code: string;
  dialCode: string;
}

const TOP_COUNTRIES: CountryCode[] = [
  { name: "United States", code: "US", dialCode: "1" },
  { name: "United Kingdom", code: "GB", dialCode: "44" },
  { name: "France", code: "FR", dialCode: "33" },
];

const OTHER_COUNTRIES: CountryCode[] = [
  { name: "Australia", code: "AU", dialCode: "61" },
  { name: "Brazil", code: "BR", dialCode: "55" },
  { name: "Canada", code: "CA", dialCode: "1" },
  { name: "China", code: "CN", dialCode: "86" },
  { name: "Germany", code: "DE", dialCode: "49" },
  { name: "India", code: "IN", dialCode: "91" },
  { name: "Italy", code: "IT", dialCode: "39" },
  { name: "Japan", code: "JP", dialCode: "81" },
  { name: "Mexico", code: "MX", dialCode: "52" },
  { name: "Netherlands", code: "NL", dialCode: "31" },
  { name: "Spain", code: "ES", dialCode: "34" },
  // Add more countries as needed
];

const Auth = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(TOP_COUNTRIES[0]);
  const [telegramHandle, setTelegramHandle] = useState("");
  const [notificationMethod, setNotificationMethod] = useState<"sms" | "telegram" | "both">("sms");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "signin";
  const { t } = useTranslation();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullPhoneNumber = phoneNumber ? `+${selectedCountry.dialCode}${phoneNumber.replace(/^0+/, '')}` : '';
    
    // Validate notification method selection
    if (notificationMethod === "sms" && !phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number for SMS notifications",
        variant: "destructive",
      });
      return;
    }
    
    if (notificationMethod === "telegram" && !telegramHandle) {
      toast({
        title: "Error",
        description: "Please enter your Telegram handle",
        variant: "destructive",
      });
      return;
    }
    
    if (notificationMethod === "both" && (!phoneNumber || !telegramHandle)) {
      toast({
        title: "Error",
        description: "Please enter both phone number and Telegram handle",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            notification_method: notificationMethod,
            phone_number: fullPhoneNumber || null,
            telegram_handle: telegramHandle || null,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Magic link sent!",
        description: "Check your email for the login link",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "signin" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin" 
              ? "Sign in to access your race updates and preferences" 
              : "Sign up to get started with Race Ratings"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <form onSubmit={handleEmailLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Notification Method</Label>
              <RadioGroup
                value={notificationMethod}
                onValueChange={(value) => setNotificationMethod(value as "sms" | "telegram" | "both")}
                className="grid gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="telegram" id="telegram" />
                  <Label htmlFor="telegram">Telegram</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">Both</Label>
                </div>
              </RadioGroup>
            </div>

            {(notificationMethod === "sms" || notificationMethod === "both") && (
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Select
                    value={selectedCountry.code}
                    onValueChange={(value) => {
                      const country = [...TOP_COUNTRIES, ...OTHER_COUNTRIES].find(c => c.code === value);
                      if (country) setSelectedCountry(country);
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select country">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4" />
                          {selectedCountry.name}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <div className="border-b border-gray-200 pb-2">
                        {TOP_COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center gap-2">
                              <Flag className="h-4 w-4" />
                              {country.name} (+{country.dialCode})
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                      {OTHER_COUNTRIES.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4" />
                            {country.name} (+{country.dialCode})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      +{selectedCountry.dialCode}
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-12"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>
              </div>
            )}

            {(notificationMethod === "telegram" || notificationMethod === "both") && (
              <div className="grid gap-2">
                <Label htmlFor="telegram">Telegram Handle</Label>
                <Input
                  id="telegram"
                  type="text"
                  placeholder="@username"
                  value={telegramHandle}
                  onChange={(e) => setTelegramHandle(e.target.value)}
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending magic link..." : "Send magic link"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Auth;
