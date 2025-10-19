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
import { useAuth } from '../../src/contexts';
import { useNavigation } from '@react-navigation/native';

import { ControlledInput, ThemedText, ThemedView } from '../../src/components';
import AppButton from '../../src/components/AppButton';
import Stack from '../../src/components/Stack';
import { useThemeCustom } from '../../src/contexts/theme';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useState, useEffect as useEffectReact } from 'react';
import { registerForPushNotificationsAsync, getSavedPushToken, sendTestPushNotification } from '../../src/services/notifications';
import { t, getDeviceLang } from '../../src/i18n';

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
  const { logout, isAuthenticated } = useAuth();
  const navigation = useNavigation();

  const [pushToken, setPushToken] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffectReact(() => {
    (async () => {
      const token = await getSavedPushToken();
      setPushToken(token);
    })();
  }, []);

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
              <Stack direction="row" spacing={12} style={styles.themeOptions}>
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
              </Stack>
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
                  <Stack direction="row" spacing={8} style={styles.presetsGrid}>
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
                  </Stack>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <AppButton
          title="Salvar Alterações"
          icon="checkmark"
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit) as any}
          style={[styles.saveButton, { backgroundColor: accentColor }]}
          disabled={isSubmitting}
        />
        {isAuthenticated && (
          <AppButton
            title="Sair"
            variant="outline"
            color={accentColor}
            onPress={async () => {
              try {
                await logout();
                // @ts-ignore
                navigation.navigate('auth/login');
              } catch (e) {
                Alert.alert('Erro', 'Falha ao deslogar. Tente novamente.');
              }
            }}
            style={[styles.logoutButton, { borderColor: accentColor }]}
          />
        )}
        <AppButton
          title="Sobre o App"
          variant="outline"
          color={accentColor}
          onPress={() => {
            // @ts-ignore - expo-router types
            navigation.navigate('configuracoes/sobre');
          }}
          style={[styles.aboutButton, { borderColor: accentColor, marginTop: 12 }]}
        />

        <AppButton
          title={pushToken ? 'Token registrado' : 'Registrar Notificações'}
          variant={pushToken ? 'outline' : 'solid'}
          color={accentColor}
          onPress={async () => {
            try {
              const token = await registerForPushNotificationsAsync();
              setPushToken(token);
              Alert.alert(t('register_success', getDeviceLang()));
            } catch (e: any) {
              Alert.alert(t('register_fail', getDeviceLang()), String(e?.message ?? e));
            }
          }}
          style={{ marginTop: 12 }}
        />

        <AppButton
          title="Enviar Notificação de Teste"
          color={accentColor}
          onPress={async () => {
            setSending(true);
            try {
              await sendTestPushNotification(pushToken ?? undefined);
              Alert.alert('Ok', 'Notificação enviada (verifique seu dispositivo)');
            } catch (e: any) {
              Alert.alert('Erro', String(e?.message ?? e));
            } finally {
              setSending(false);
            }
          }}
          loading={sending}
          style={{ marginTop: 8 }}
        />
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
    aboutButton: {
      paddingVertical: 12,
      borderRadius: 8,
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
    // use marginRight on children instead of gap
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
    // spacing between items: use Stack or margins between children
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
    // use margin on icon/text instead of gap
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
    // use Stack wrapper for spacing between options
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
    // use margin on child elements instead of gap
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
    // use Stack or explicit margins for spacing
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    // use marginRight on color circle instead of gap
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
    // use margin on icon/text instead of gap
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // spacing using margin between spinner and text
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  colorPresets: {
    marginTop: 16,
    // spacing between presets handled by Stack in markup
  },
  presetsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // use Stack or margin on child preset buttons
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
  logoutButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
