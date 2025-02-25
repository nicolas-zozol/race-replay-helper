
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NotificationButtons = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <Link to="/auth?mode=signup">
        <Button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white">
          {t("header.signUp")}
        </Button>
      </Link>
      <Button 
        variant="destructive" 
        className="flex items-center justify-center gap-2"
        onClick={() => {
          // Here we'll add the cancel subscription logic later
          console.log('Cancel subscription clicked');
        }}
      >
        Cancel Subscription
      </Button>
    </div>
  );
};
