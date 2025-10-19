// Minimal i18n helper used pelo app para notificações e pequenas strings
export type SupportedLang = 'pt' | 'en';

const translations: Record<SupportedLang, Record<string, string>> = {
  pt: {
    test_notification_title: 'Notificação de teste',
    test_notification_body: 'Olá! Esta é uma notificação de teste em Português.',
    register_success: 'Registrado para notificações com sucesso',
    register_fail: 'Falha ao registrar notificações',
  },
  en: {
    test_notification_title: 'Test notification',
    test_notification_body: 'Hi! This is a test notification in English.',
    register_success: 'Registered for notifications successfully',
    register_fail: 'Failed to register for notifications',
  },
};

export function getDeviceLang(): SupportedLang {
  try {
    // tentativa segura de obter locale
    const locale = Intl?.DateTimeFormat().resolvedOptions().locale ?? 'pt-BR';
    if (locale.startsWith('en')) return 'en';
    return 'pt';
  } catch (e) {
    return 'pt';
  }
}

export function t(key: string, lang?: SupportedLang) {
  const l = lang ?? getDeviceLang();
  return translations[l][key] ?? key;
}
