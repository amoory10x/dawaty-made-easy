
import { useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { languages, searchLanguages, getLanguageByCode, type Language } from "@/data/languages";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedLang = getLanguageByCode(selectedLanguage);
  const filteredLanguages = searchLanguages(searchQuery);

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-amber-300 hover:border-amber-400"
          >
            {selectedLang ? (
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedLang.flag}</span>
                <span>{selectedLang.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {selectedLang.nativeName}
                </Badge>
              </div>
            ) : (
              "اختر اللغة - Select Language"
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="ابحث عن لغة... Search languages..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>لا توجد لغة بهذا الاسم - No language found</CommandEmpty>
              <CommandGroup>
                {filteredLanguages.map((language) => (
                  <CommandItem
                    key={language.code}
                    value={language.code}
                    onSelect={() => handleLanguageSelect(language.code)}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{language.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{language.name}</span>
                        <span className="text-sm text-gray-500" dir="auto">
                          {language.nativeName}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {language.family}
                      </Badge>
                    </div>
                    {selectedLanguage === language.code && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LanguageSelector;
