// Minimal i18n helper used pelo app para notificações e pequenas strings
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SupportedLang = 'pt' | 'es' | 'en';

const translations: Record<SupportedLang, Record<string, string>> = {
  pt: {
    error_label: 'Erro',
    success_label: 'Sucesso',
    info_label: 'Info',
    load_motos_fail: 'Falha ao carregar motos',
    delete_label: 'Excluir',
    delete_confirm: 'Confirmar exclusão desta moto?',
    cancel_label: 'Cancelar',
    delete_fail: 'Falha ao excluir a moto',
    not_found_label: 'Moto não encontrada',
    not_found_message: 'Verifique a chave/placa digitada.',
    search_fail: 'Não foi possível buscar a moto. Tente novamente.',
    load_moto_fail: 'Falha ao carregar moto',
    data_saved: 'Dados salvos!',
    save_fail: 'Falha ao salvar',
    edit_moto: 'Editar Moto',
    create_moto: 'Cadastrar Moto',
    fill_moto_data: 'Preencha os dados abaixo para adicionar a motocicleta na frota',
    moto_info: 'Informações da Moto',
    modelo_label: 'Modelo',
    placa_label: 'Placa',
    status_label: 'Status (opcional)',
    update_moto: 'Atualizar Moto',
    form_cleared: 'Os campos foram limpos. Você pode preencher novamente.',
    settings_title: 'Configurações',
    settings_subtitle: 'Personalize a aparência e comportamento do app',
    language_label: 'Idioma do App',
    theme_label: 'Tema do App',
    appearance: 'Aparência',
    colors: 'Cores',
    save_changes: 'Salvar Alterações',
    logout: 'Sair',
    register: 'Registrar',
    enter: 'Entrar',
    create_account: 'Criar Conta',
    fill_data: 'Preencha os dados para se cadastrar',
    email_label: 'Email',
    password_label: 'Senha',
    name_label: 'Nome Completo',
    confirm_password_label: 'Confirmar Senha',
    test_notification_title: 'Notificação de teste',
    test_notification_body: 'Olá! Esta é uma notificação de teste em Português.',
    register_success: 'Registrado para notificações com sucesso',
    register_fail: 'Falha ao registrar notificações',
    about_title: 'Sobre o App',
    about_commit_label: 'Hash do commit de referência:',
    about_note: 'Valor buscado em app.json/package.json/COMMIT_HASH',
  },
  es: {
    error_label: 'Error',
    success_label: 'Éxito',
    info_label: 'Info',
    load_motos_fail: 'Error al cargar motos',
    delete_label: 'Eliminar',
    delete_confirm: '¿Confirmar la eliminación de esta moto?',
    cancel_label: 'Cancelar',
    delete_fail: 'Error al eliminar la moto',
    not_found_label: 'Moto no encontrada',
    not_found_message: 'Verifique la clave/placa ingresada.',
    search_fail: 'No se pudo buscar la moto. Inténtalo de nuevo.',
    load_moto_fail: 'Error al cargar la moto',
    data_saved: '¡Datos guardados!',
    save_fail: 'Error al guardar',
    edit_moto: 'Editar Moto',
    create_moto: 'Registrar Moto',
    fill_moto_data: 'Complete los datos a continuación para agregar la motocicleta a la flota',
    moto_info: 'Información de la Moto',
    modelo_label: 'Modelo',
    placa_label: 'Placa',
    status_label: 'Estado (opcional)',
    update_moto: 'Actualizar Moto',
    form_cleared: 'Los campos han sido limpiados. Puedes completar de nuevo.',
    settings_title: 'Configuraciones',
    settings_subtitle: 'Personaliza la apariencia y comportamiento de la app',
    language_label: 'Idioma de la App',
    theme_label: 'Tema de la App',
    appearance: 'Apariencia',
    colors: 'Colores',
    save_changes: 'Guardar cambios',
    logout: 'Salir',
    register: 'Registrar',
    enter: 'Entrar',
    create_account: 'Crear Cuenta',
    fill_data: 'Rellena los datos para registrarte',
    email_label: 'Correo',
    password_label: 'Contraseña',
    name_label: 'Nombre Completo',
    confirm_password_label: 'Confirmar Contraseña',
    test_notification_title: 'Notificación de prueba',
    test_notification_body: '¡Hola! Esta es una notificación de prueba en Español.',
    register_success: 'Registrado para notificaciones con éxito',
    register_fail: 'Error al registrar notificaciones',
    about_title: 'Acerca de la App',
    about_commit_label: 'Hash del commit de referencia:',
    about_note: 'Valor obtenido de app.json/package.json/COMMIT_HASH',
  },
  en: {
    error_label: 'Error',
    success_label: 'Success',
    info_label: 'Info',
    load_motos_fail: 'Failed to load motos',
    delete_label: 'Delete',
    delete_confirm: 'Confirm deletion of this moto?',
    cancel_label: 'Cancel',
    delete_fail: 'Failed to delete moto',
    not_found_label: 'Moto not found',
    not_found_message: 'Check the provided key/plate.',
    search_fail: 'Could not search for the moto. Try again.',
    load_moto_fail: 'Failed to load moto',
    data_saved: 'Data saved!',
    save_fail: 'Failed to save',
    edit_moto: 'Edit Moto',
    create_moto: 'Create Moto',
    fill_moto_data: 'Fill the fields below to add the motorcycle to the fleet',
    moto_info: 'Moto Information',
    modelo_label: 'Model',
    placa_label: 'Plate',
    status_label: 'Status (optional)',
    update_moto: 'Update Moto',
    form_cleared: 'Fields cleared. You can fill them again.',
    settings_title: 'Settings',
    settings_subtitle: 'Customize the appearance and behavior of the app',
    language_label: 'App Language',
    theme_label: 'App Theme',
    appearance: 'Appearance',
    colors: 'Colors',
    save_changes: 'Save Changes',
    logout: 'Logout',
    register: 'Register',
    enter: 'Sign in',
    create_account: 'Create Account',
    fill_data: 'Fill the fields to create an account',
    email_label: 'Email',
    password_label: 'Password',
    name_label: 'Full Name',
    confirm_password_label: 'Confirm Password',
    test_notification_title: 'Test notification',
    test_notification_body: 'Hi! This is a test notification in English.',
    register_success: 'Registered for notifications successfully',
    register_fail: 'Failed to register for notifications',
    about_title: 'About the App',
    about_commit_label: 'Reference commit hash:',
    about_note: 'Value fetched from app.json/package.json/COMMIT_HASH',
  },
};

const LANG_KEY = '@FleetZone:lang';

export async function setAppLang(lang: SupportedLang) {
  await AsyncStorage.setItem(LANG_KEY, lang);
}

export async function getAppLang(): Promise<SupportedLang> {
  try {
    const stored = await AsyncStorage.getItem(LANG_KEY);
    if (stored && (stored === 'pt' || stored === 'es' || stored === 'en')) return stored;
  } catch (e) {
    // ignore
  }

  try {
    const locale = Intl?.DateTimeFormat().resolvedOptions().locale ?? 'pt-BR';
    if (locale.startsWith('es')) return 'es';
    if (locale.startsWith('en')) return 'en';
    return 'pt';
  } catch (e) {
    return 'pt';
  }
}

export function t(key: string, lang?: SupportedLang) {
  // sync helper: when lang not supplied use 'pt' as fallback; callers should use getAppLang for async
  const l = lang ?? 'pt';
  return translations[l][key] ?? key;
}

export async function tAsync(key: string) {
  const lang = await getAppLang();
  return translations[lang][key] ?? key;
}

