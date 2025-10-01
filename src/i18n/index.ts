import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import pt from './pt.json';
import es from './es.json';

// Configuração do i18n
const i18n = new I18n({
  pt,
  es,
});

// Idioma padrão
i18n.defaultLocale = 'pt';

// Idioma atual (será definido dinamicamente)
i18n.locale = 'pt';

// Configuração de fallback
i18n.enableFallback = true;

// Função para detectar idioma do dispositivo
export const detectDeviceLanguage = (): string => {
  try {
    // Sempre retorna português como padrão por enquanto
    // TODO: Implementar detecção mais robusta quando necessário
    return 'pt';
  } catch (error) {
    console.error('Erro ao detectar idioma do dispositivo:', error);
    return 'pt'; 
  }
};

// Função para carregar idioma salvo
export const loadSavedLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem('@FleetZone:language');
    return savedLanguage || detectDeviceLanguage();
  } catch (error) {
    console.error('Erro ao carregar idioma salvo:', error);
    return detectDeviceLanguage();
  }
};

// Função para salvar idioma
export const saveLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('@FleetZone:language', language);
    i18n.locale = language;
  } catch (error) {
    console.error('Erro ao salvar idioma:', error);
  }
};

// Função para definir idioma
export const setLanguage = (language: string): void => {
  i18n.locale = language;
};

// Função para obter idioma atual
export const getCurrentLanguage = (): string => {
  return i18n.locale;
};

// Função para obter idiomas disponíveis
export const getAvailableLanguages = (): Array<{ code: string; name: string; flag: string }> => {
  return [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];
};

// Função para traduzir
export const t = (key: string, options?: any): string => {
  return i18n.t(key, options);
};

// Inicializar idioma
export const initializeLanguage = async (): Promise<void> => {
  const language = await loadSavedLanguage();
  setLanguage(language);
};

export default i18n;
