import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="space-y-4 mt-4">
      <Input
        type="email"
        placeholder={t("hero.email.placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={() => handleSubmit("email")} className="w-full">
        {t("hero.email.subscribe")}
      </Button>
      <p className="text-sm text-muted-foreground">
        {t("hero.email.privacy")}
      </p>
    </div>
  );
};