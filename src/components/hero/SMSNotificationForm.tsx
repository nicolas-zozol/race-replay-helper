import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SMSNotificationFormProps {
  phoneNumber: string;
  email: string;
  setPhoneNumber: (value: string) => void;
  setEmail: (value: string) => void;
  handleSubmit: (type: string) => void;
  handleGoogleSignup: () => void;
  showFullForm: boolean;
  setShowFullForm: (value: boolean) => void;
}

export const SMSNotificationForm = ({
  phoneNumber,
  email,
  setPhoneNumber,
  setEmail,
  handleSubmit,
  handleGoogleSignup,
  showFullForm,
  setShowFullForm,
}: SMSNotificationFormProps) => {
  if (!showFullForm) {
    return (
      <div className="space-y-4 mt-4">
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button onClick={() => setShowFullForm(true)} className="w-full">
          Continue
        </Button>
      </div>
    );
  }

  return (
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
  );
};