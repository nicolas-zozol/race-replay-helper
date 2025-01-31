import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export const Header = ({ session }: { session: any }) => {
  const { t } = useTranslation();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Race Ratings
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          {!session ? (
            <>
              <Link to="/auth?mode=signin">
                <Button variant="ghost">{t('header.signIn')}</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button>{t('header.signUp')}</Button>
              </Link>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={() => supabase.auth.signOut()}
            >
              {t('header.signOut')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};