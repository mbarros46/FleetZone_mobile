import { useState, useEffect } from 'react';
import { t, getCurrentLanguage, setLanguage, saveLanguage, getAvailableLanguages } from '../i18n';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  const changeLanguage = async (language: string) => {
    setLanguage(language);
    await saveLanguage(language);
    setCurrentLanguage(language);
  };

  const availableLanguages = getAvailableLanguages();

  return {
    t,
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };
};
