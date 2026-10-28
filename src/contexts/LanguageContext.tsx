import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n/config';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const browserLang = navigator.language.split('-')[0];
    const supportedLanguages = ['en', 'es', 'de', 'ar', 'tr', 'fr', 'it', 'pt', 'ru', 'zh', 'ja'];
    return supportedLanguages.includes(browserLang) ? browserLang : 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: string) => i18n.t(key);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}