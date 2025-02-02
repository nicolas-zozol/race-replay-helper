import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmailNotificationFormProps {
  email: string;
  setEmail: (value: string) => void;
  handleSubmit: (type: string) => void;
}

export const EmailNotificationForm = ({
  email,
  setEmail,
  handleSubmit,
}: EmailNotificationFormProps) => {
  return (
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
  );
};