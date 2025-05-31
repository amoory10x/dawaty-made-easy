export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  family: string;
}

export const languages: Language[] = [
  // Arabic and related
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", family: "Semitic" },
  { code: "ar-eg", name: "Arabic (Egyptian)", nativeName: "العربية المصرية", flag: "🇪🇬", family: "Semitic" },
  { code: "ar-ma", name: "Arabic (Moroccan)", nativeName: "العربية المغربية", flag: "🇲🇦", family: "Semitic" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱", family: "Semitic" },
  
  // English and Germanic
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", family: "Germanic" },
  { code: "en-gb", name: "English (British)", nativeName: "English (UK)", flag: "🇬🇧", family: "Germanic" },
  { code: "en-au", name: "English (Australian)", nativeName: "English (AU)", flag: "🇦🇺", family: "Germanic" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", family: "Germanic" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", family: "Germanic" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪", family: "Germanic" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴", family: "Germanic" },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰", family: "Germanic" },
  
  // Romance Languages
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", family: "Romance" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", family: "Romance" },
  { code: "es-mx", name: "Spanish (Mexican)", nativeName: "Español (MX)", flag: "🇲🇽", family: "Romance" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", family: "Romance" },
  { code: "pt-br", name: "Portuguese (Brazilian)", nativeName: "Português (BR)", flag: "🇧🇷", family: "Romance" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", family: "Romance" },
  { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴", family: "Romance" },
  { code: "ca", name: "Catalan", nativeName: "Català", flag: "🏴󠁥󠁳󠁣󠁴󠁿", family: "Romance" },
  
  // Slavic Languages
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", family: "Slavic" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦", family: "Slavic" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱", family: "Slavic" },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿", family: "Slavic" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰", family: "Slavic" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷", family: "Slavic" },
  { code: "sr", name: "Serbian", nativeName: "Српски", flag: "🇷🇸", family: "Slavic" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", flag: "🇧🇬", family: "Slavic" },
  
  // Indo-Aryan Languages
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", family: "Indo-Aryan" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰", family: "Indo-Aryan" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩", family: "Indo-Aryan" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳", family: "Indo-Aryan" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", family: "Indo-Aryan" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", family: "Indo-Aryan" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", flag: "🇳🇵", family: "Indo-Aryan" },
  
  // East Asian Languages
  { code: "zh", name: "Chinese (Mandarin)", nativeName: "中文", flag: "🇨🇳", family: "Sino-Tibetan" },
  { code: "zh-tw", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼", family: "Sino-Tibetan" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", family: "Japonic" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", family: "Koreanic" },
  
  // Southeast Asian Languages
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", family: "Tai-Kadai" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", family: "Austroasiatic" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", family: "Austronesian" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾", family: "Austronesian" },
  { code: "tl", name: "Filipino", nativeName: "Filipino", flag: "🇵🇭", family: "Austronesian" },
  
  // Iranian Languages
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷", family: "Iranian" },
  { code: "ku", name: "Kurdish", nativeName: "کوردی", flag: "🔶", family: "Iranian" },
  { code: "ps", name: "Pashto", nativeName: "پښتو", flag: "🇦🇫", family: "Iranian" },
  
  // Turkic Languages
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", family: "Turkic" },
  { code: "az", name: "Azerbaijani", nativeName: "Azərbaycan", flag: "🇦🇿", family: "Turkic" },
  { code: "kk", name: "Kazakh", nativeName: "Қазақша", flag: "🇰🇿", family: "Turkic" },
  { code: "ky", name: "Kyrgyz", nativeName: "Кыргызча", flag: "🇰🇬", family: "Turkic" },
  { code: "uz", name: "Uzbek", nativeName: "O'zbek", flag: "🇺🇿", family: "Turkic" },
  
  // African Languages
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇹🇿", family: "Niger-Congo" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹", family: "Semitic" },
  { code: "ha", name: "Hausa", nativeName: "Hausa", flag: "🇳🇬", family: "Afroasiatic" },
  { code: "yo", name: "Yoruba", nativeName: "Yorùbá", flag: "🇳🇬", family: "Niger-Congo" },
  { code: "zu", name: "Zulu", nativeName: "isiZulu", flag: "🇿🇦", family: "Niger-Congo" },
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", flag: "🇿🇦", family: "Germanic" },
  
  // Other Important Languages
  { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮", family: "Uralic" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺", family: "Uralic" },
  { code: "et", name: "Estonian", nativeName: "Eesti", flag: "🇪🇪", family: "Uralic" },
  { code: "lv", name: "Latvian", nativeName: "Latviešu", flag: "🇱🇻", family: "Baltic" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", flag: "🇱🇹", family: "Baltic" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷", family: "Hellenic" },
  { code: "ka", name: "Georgian", nativeName: "ქართული", flag: "🇬🇪", family: "Kartvelian" },
  { code: "hy", name: "Armenian", nativeName: "Հայերեն", flag: "🇦🇲", family: "Armenian" },
  { code: "is", name: "Icelandic", nativeName: "Íslenska", flag: "🇮🇸", family: "Germanic" },
  { code: "mt", name: "Maltese", nativeName: "Malti", flag: "🇲🇹", family: "Semitic" },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};

export const searchLanguages = (query: string): Language[] => {
  if (!query.trim()) return languages;
  
  const lowercaseQuery = query.toLowerCase();
  return languages.filter(lang => 
    lang.name.toLowerCase().includes(lowercaseQuery) ||
    lang.nativeName.toLowerCase().includes(lowercaseQuery) ||
    lang.family.toLowerCase().includes(lowercaseQuery)
  );
};
