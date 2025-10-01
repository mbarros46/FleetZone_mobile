import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';

import { ControlledInput, ThemedText, ThemedView } from '../../src/components';
import { useThemeCustom } from '../../src/contexts/theme';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useAuth } from '../../src/contexts/auth';
import { useTranslation } from '../../src/hooks/useTranslation';

const configSchema = z.object({
  corDestaque: z
    .string()
    .min(1, 'Cor de destaque é obrigatória')
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      'Cor deve estar no formato hexadecimal (#RRGGBB)',
    )
    .toUpperCase(),
});

type ConfigForm = z.infer<typeof configSchema>;

export default function ConfiguracoesScreen() {
  const { mode, setMode, effectiveTheme } = useThemeCustom();
  const { accentColor, saveAccentColor } = useAccentColor();
  const { logout, usuario } = useAuth();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useTranslation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConfigForm>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      corDestaque: '',
    },
  });

  useEffect(() => {
    setValue('corDestaque', accentColor);
  }, [accentColor, setValue]);

  const onSubmit = async (data: ConfigForm) => {
    try {
      await saveAccentColor(data.corDestaque);
      Alert.alert('Sucesso', 'Configurações salvas!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível fazer logout');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
            <Ionicons name="settings" size={32} color={accentColor} />
          </View>
          <ThemedText type="title" style={styles.title}>
            Configurações
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Personalize a aparência e comportamento do app
          </ThemedText>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="color-palette" size={20} color={accentColor} />
            <ThemedText style={styles.sectionTitle}>Aparência</ThemedText>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingRow}>
                <ThemedText style={styles.settingLabel}>Tema do App</ThemedText>
                <View style={styles.themeStatus}>
                  <Ionicons 
                    name={effectiveTheme === 'dark' ? 'moon' : 'sunny'} 
                    size={16} 
                    color={accentColor} 
                  />
                  <ThemedText style={[styles.themeStatusText, { color: accentColor }]}>
                    {effectiveTheme === 'dark' ? 'Escuro' : 'Claro'} 
                    {mode === 'system' ? ' (Auto)' : ''}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.themeOptions}>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    mode === 'light' && [styles.themeOptionSelected, { 
                      borderColor: accentColor,
                      backgroundColor: `${accentColor}15`
                    }],
                  ]}
                  onPress={() => {
                    setMode('light');
                    Alert.alert('Tema Alterado', 'Tema claro aplicado com sucesso!');
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="sunny" size={20} color={mode === 'light' ? accentColor : '#666'} />
                  <ThemedText style={[
                    styles.themeOptionText,
                    mode === 'light' && { color: accentColor, fontWeight: '600' }
                  ]}>
                    Claro
                  </ThemedText>
                  {mode === 'light' && (
                    <Ionicons name="checkmark-circle" size={16} color={accentColor} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    mode === 'dark' && [styles.themeOptionSelected, { 
                      borderColor: accentColor,
                      backgroundColor: `${accentColor}15`
                    }],
                  ]}
                  onPress={() => {
                    setMode('dark');
                    Alert.alert('Tema Alterado', 'Tema escuro aplicado com sucesso!');
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="moon" size={20} color={mode === 'dark' ? accentColor : '#666'} />
                  <ThemedText style={[
                    styles.themeOptionText,
                    mode === 'dark' && { color: accentColor, fontWeight: '600' }
                  ]}>
                    Escuro
                  </ThemedText>
                  {mode === 'dark' && (
                    <Ionicons name="checkmark-circle" size={16} color={accentColor} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    mode === 'system' && [styles.themeOptionSelected, { 
                      borderColor: accentColor,
                      backgroundColor: `${accentColor}15`
                    }],
                  ]}
                  onPress={() => {
                    setMode('system');
                    Alert.alert('Tema Alterado', 'Tema automático ativado - segue o sistema!');
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="phone-portrait" size={20} color={mode === 'system' ? accentColor : '#666'} />
                  <ThemedText style={[
                    styles.themeOptionText,
                    mode === 'system' && { color: accentColor, fontWeight: '600' }
                  ]}>
                    Sistema
                  </ThemedText>
                  {mode === 'system' && (
                    <Ionicons name="checkmark-circle" size={16} color={accentColor} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle" size={20} color={accentColor} />
            <ThemedText style={styles.sectionTitle}>Conta</ThemedText>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.accountInfo}>
                <View style={styles.userInfo}>
                  <View style={[styles.userAvatar, { backgroundColor: `${accentColor}20` }]}>
                    <Ionicons name="person" size={24} color={accentColor} />
                  </View>
                  <View style={styles.userDetails}>
                    <ThemedText style={styles.userName}>{usuario?.nome || 'Usuário'}</ThemedText>
                    <ThemedText style={styles.userEmail}>{usuario?.email || 'email@exemplo.com'}</ThemedText>
                  </View>
                </View>
                
                <TouchableOpacity
                  style={[styles.logoutButton, { borderColor: '#FF6B35' }]}
                  onPress={handleLogout}
                  activeOpacity={0.7}
                >
                  <Ionicons name="log-out" size={20} color="#FF6B35" />
                  <ThemedText style={[styles.logoutText, { color: '#FF6B35' }]}>
                    Sair da Conta
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="language" size={20} color={accentColor} />
            <ThemedText style={styles.sectionTitle}>{t('settings.language')}</ThemedText>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.languageSection}>
                <View style={styles.languagePreview}>
                  <ThemedText style={styles.languageLabel}>
                    {t('settings.language')}
                  </ThemedText>
                  <View style={styles.currentLanguage}>
                    <ThemedText style={styles.currentLanguageText}>
                      {availableLanguages.find(lang => lang.code === currentLanguage)?.flag} {availableLanguages.find(lang => lang.code === currentLanguage)?.name}
                    </ThemedText>
                  </View>
                </View>
                
                <View style={styles.languageOptions}>
                  {availableLanguages.map((language) => (
                    <TouchableOpacity
                      key={language.code}
                      style={[
                        styles.languageOption,
                        currentLanguage === language.code && [styles.languageOptionSelected, { 
                          borderColor: accentColor,
                          backgroundColor: `${accentColor}15`
                        }],
                      ]}
                      onPress={() => {
                        changeLanguage(language.code);
                        Alert.alert('Idioma Alterado', `Idioma alterado para ${language.name}`);
                      }}
                      activeOpacity={0.7}
                    >
                      <ThemedText style={styles.languageFlag}>{language.flag}</ThemedText>
                      <ThemedText style={[
                        styles.languageName,
                        currentLanguage === language.code && { color: accentColor, fontWeight: '600' }
                      ]}>
                        {language.name}
                      </ThemedText>
                      {currentLanguage === language.code && (
                        <Ionicons name="checkmark-circle" size={16} color={accentColor} style={styles.checkIcon} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Color Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="brush" size={20} color={accentColor} />
            <ThemedText style={styles.sectionTitle}>Cores</ThemedText>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.colorSection}>
                <View style={styles.colorPreview}>
                  <View style={[styles.colorCircle, { backgroundColor: accentColor }]} />
                  <ThemedText style={styles.colorLabel}>Cor de Destaque</ThemedText>
                </View>
                
                <ControlledInput
                  name="corDestaque"
                  control={control}
                  label=""
                  placeholder="#0A7EA4"
                  error={errors.corDestaque}
                  autoCapitalize="characters"
                  maxLength={7}
                  style={styles.colorInput}
                />

                <View style={styles.colorPresets}>
                  <ThemedText style={styles.presetsLabel}>Cores Predefinidas:</ThemedText>
                  <View style={styles.presetsGrid}>
                    {[
                      { name: 'Laranja', color: '#FF6B35' },
                      { name: 'Azul', color: '#0A7EA4' },
                      { name: 'Verde', color: '#4CAF50' },
                      { name: 'Roxo', color: '#9C27B0' },
                      { name: 'Vermelho', color: '#F44336' },
                      { name: 'Dourado', color: '#FF9800' },
                    ].map((preset) => (
                      <TouchableOpacity
                        key={preset.color}
                        style={[styles.presetButton, { backgroundColor: preset.color }]}
                        onPress={() => {
                          setValue('corDestaque', preset.color);
                          saveAccentColor(preset.color);
                          Alert.alert('Cor Alterada', `Cor ${preset.name} aplicada!`);
                        }}
                        activeOpacity={0.8}
                      >
                        <ThemedText style={styles.presetButtonText}>{preset.name}</ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: accentColor },
            isSubmitting && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="white" size="small" />
              <ThemedText style={styles.buttonText}>Salvando...</ThemedText>
            </View>
          ) : (
            <View style={styles.buttonContent}>
              <Ionicons name="checkmark" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Salvar Alterações</ThemedText>
            </View>
          )}
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    gap: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  themeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 20,
  },
  themeStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  checkIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 8,
  },
  themeOptionSelected: {
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  colorSection: {
    gap: 16,
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e1e5e9',
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  colorInput: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    fontFamily: 'monospace',
  },
  saveButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  colorPresets: {
    marginTop: 16,
    gap: 12,
  },
  presetsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  presetButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  accountInfo: {
    gap: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
  },
  languageSection: {
    gap: 16,
  },
  languagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  currentLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    borderRadius: 20,
  },
  currentLanguageText: {
    fontSize: 14,
    fontWeight: '600',
    color: accentColor,
  },
  languageOptions: {
    gap: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 12,
  },
  languageOptionSelected: {
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
  },
  languageFlag: {
    fontSize: 20,
  },
  languageName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
});
