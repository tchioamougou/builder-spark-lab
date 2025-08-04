import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = {
    fr: { code: "FR", name: "Français", flag: "🇫🇷" },
    en: { code: "EN", name: "English", flag: "🇬🇧" },
  };

  const currentLanguage =
    languages[i18n.language as keyof typeof languages] || languages.fr;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-gray-200 hover:text-[#ff9900] hover:bg-white/10 transition-all duration-300 h-auto px-3 py-2 gap-2 text-sm font-medium"
        >
          <span className="text-lg leading-none">{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.code}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white border border-gray-200 shadow-xl rounded-lg p-1 min-w-[160px]"
        sideOffset={5}
      >
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200
              hover:bg-[#ff9900] hover:text-white focus:bg-[#ff9900] focus:text-white
              ${i18n.language === code ? "bg-gray-50 font-medium" : ""}
            `}
          >
            <span className="text-lg leading-none">{lang.flag}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{lang.name}</span>
              <span className="text-xs opacity-70">{lang.code}</span>
            </div>
            {i18n.language === code && (
              <div className="ml-auto w-2 h-2 bg-[#ff9900] rounded-full flex-shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
