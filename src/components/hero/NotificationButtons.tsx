import { MessageSquare, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SMSNotificationForm } from "./SMSNotificationForm";
import { TelegramNotificationForm } from "./TelegramNotificationForm";
import { EmailNotificationForm } from "./EmailNotificationForm";

interface NotificationButtonsProps {
  phoneNumber: string;
  telegram: string;
  email: string;
  setPhoneNumber: (value: string) => void;
  setTelegram: (value: string) => void;
  setEmail: (value: string) => void;
  handleSubmit: (type: string) => void;
  handleGoogleSignup: () => void;
  showFullSMSForm: boolean;
  setShowFullSMSForm: (value: boolean) => void;
  showFullTelegramForm: boolean;
  setShowFullTelegramForm: (value: boolean) => void;
}

export const NotificationButtons = ({
  phoneNumber,
  telegram,
  email,
  setPhoneNumber,
  setTelegram,
  setEmail,
  handleSubmit,
  handleGoogleSignup,
  showFullSMSForm,
  setShowFullSMSForm,
  showFullTelegramForm,
  setShowFullTelegramForm,
}: NotificationButtonsProps) => {
  return (
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
          <SMSNotificationForm
            phoneNumber={phoneNumber}
            email={email}
            setPhoneNumber={setPhoneNumber}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            handleGoogleSignup={handleGoogleSignup}
            showFullForm={showFullSMSForm}
            setShowFullForm={setShowFullSMSForm}
          />
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
          <TelegramNotificationForm
            telegram={telegram}
            email={email}
            setTelegram={setTelegram}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            handleGoogleSignup={handleGoogleSignup}
            showFullForm={showFullTelegramForm}
            setShowFullForm={setShowFullTelegramForm}
          />
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 border-2 border-muted text-muted hover:border-primary hover:text-primary"
          >
            <Mail className="w-5 h-5" />
            Email updates
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign up for Email updates</DialogTitle>
            <DialogDescription>Get race ratings and updates directly in your inbox.</DialogDescription>
          </DialogHeader>
          <EmailNotificationForm email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};