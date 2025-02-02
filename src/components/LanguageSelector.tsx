import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
    { code: 'pt', name: 'Português' }
  ];

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    Cookies.set('i18next', value, { expires: 365 }); // Cookie expires in 1 year
  };

  // Find current language name for display
  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <Select
      value={i18n.language}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={currentLanguage?.name || 'Select language'} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};