import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ru, type TranslationKeys } from './translations/ru';
import { kz } from './translations/kz';
import { en } from './translations/en';
import { cn } from './translations/cn';

type LangCode = 'ru' | 'kz' | 'en' | 'cn';

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: TranslationKeys;
}

const translations: Record<LangCode, TranslationKeys> = { ru, kz, en, cn };

const LanguageContext = createContext<LanguageContextType>({
  lang: 'kz',
  setLang: () => {},
  t: kz,
});

export const languages: { code: LangCode; label: string; flag: string }[] = [
  { code: 'kz', label: 'Қазақша', flag: '🇰🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'cn', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const saved = localStorage.getItem('agrosauda_lang');
    return (saved as LangCode) || 'kz';
  });

  const setLang = useCallback((newLang: LangCode) => {
    setLangState(newLang);
    localStorage.setItem('agrosauda_lang', newLang);
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
