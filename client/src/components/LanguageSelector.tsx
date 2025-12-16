import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const languages = [
  { code: "pt", label: "Portugues", flag: "BR" },
  { code: "en", label: "English", flag: "US" },
  { code: "es", label: "Espanol", flag: "ES" },
] as const;

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const currentLang = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-amber-400"
          data-testid="button-language-selector"
        >
          <Globe className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-stone-900 border-amber-900/50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`font-body cursor-pointer ${
              language === lang.code ? "text-amber-400" : "text-amber-200"
            }`}
            data-testid={`button-lang-${lang.code}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
