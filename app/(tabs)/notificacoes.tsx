import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useTranslation } from '../../src/hooks/useTranslation';
import { notificationsService } from '../../src/services/notificationsService';

export default function NotificacoesScreen() {
  const { accentColor } = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const { t } = useTranslation();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [testTitle, setTestTitle] = useState('FleetZone Mobile');
  const [testBody, setTestBody] = useState('Esta é uma notificação de teste!');

  useEffect(() => {
    initializeNotifications();
  }, []);

  const initializeNotifications = async () => {
    try {
      setLoading(true);
      const notificationToken = await notificationsService.registerForPushNotifications();
      if (notificationToken) {
        setToken(notificationToken.token);
      }
    } catch (error: any) {
      Alert.alert(t('notifications.testError'), error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      setLoading(true);
      await notificationsService.sendTestNotification();
      Alert.alert(t('notifications.testSuccess'), 'Notificação de teste enviada!');
    } catch (error: any) {
      Alert.alert(t('notifications.testError'), error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomNotification = async () => {
    if (!testTitle.trim() || !testBody.trim()) {
      Alert.alert('Erro', 'Preencha título e mensagem');
      return;
    }

    try {
      setLoading(true);
      await notificationsService.sendNotification(testTitle, testBody);
      Alert.alert(t('notifications.testSuccess'), 'Notificação personalizada enviada!');
    } catch (error: any) {
      Alert.alert(t('notifications.testError'), error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPermissions = async () => {
    try {
      setLoading(true);
      const granted = await notificationsService.requestPermissions();
      if (granted) {
        Alert.alert('Sucesso', t('notifications.permissionGranted'));
        await initializeNotifications();
      } else {
        Alert.alert('Erro', t('notifications.permissionDenied'));
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToken = () => {
    if (token) {
      // Em um app real, você usaria Clipboard.setString(token)
      Alert.alert('Token Copiado', 'Token copiado para a área de transferência');
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
            <Ionicons name="notifications" size={32} color={accentColor} />
          </View>
          <ThemedText type="title" style={styles.title}>
            {t('notifications.title')}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {t('notifications.subtitle')}
          </ThemedText>
        </View>

        {/* Token Section */}
        <ThemedView style={[styles.infoCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="key" size={20} color={accentColor} />
            <ThemedText style={styles.cardTitle}>{t('notifications.token')}</ThemedText>
          </View>

          <View style={styles.tokenSection}>
            {token ? (
              <View style={styles.tokenContainer}>
                <ThemedText style={styles.tokenLabel}>Token de Notificação:</ThemedText>
                <ThemedText style={styles.tokenText} numberOfLines={3}>
                  {token}
                </ThemedText>
                <TouchableOpacity
                  style={[styles.copyButton, { backgroundColor: accentColor }]}
                  onPress={copyToken}
                >
                  <Ionicons name="copy" size={16} color="white" />
                  <ThemedText style={styles.copyButtonText}>Copiar Token</ThemedText>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.noTokenContainer}>
                <Ionicons name="warning" size={24} color="#FF9800" />
                <ThemedText style={styles.noTokenText}>
                  Token não disponível. Solicite permissões primeiro.
                </ThemedText>
              </View>
            )}
          </View>
        </ThemedView>

        {/* Test Notifications Section */}
        <ThemedView style={[styles.infoCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="flask" size={20} color={accentColor} />
            <ThemedText style={styles.cardTitle}>Teste de Notificações</ThemedText>
          </View>

          <View style={styles.testSection}>
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: accentColor }]}
              onPress={handleTestNotification}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Ionicons name="send" size={20} color="white" />
              )}
              <ThemedText style={styles.testButtonText}>
                {t('notifications.testNotification')}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.permissionButton, { borderColor: accentColor }]}
              onPress={handleRequestPermissions}
              disabled={loading}
            >
              <Ionicons name="shield-checkmark" size={20} color={accentColor} />
              <ThemedText style={[styles.permissionButtonText, { color: accentColor }]}>
                Solicitar Permissões
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Custom Notification Section */}
        <ThemedView style={[styles.infoCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="create" size={20} color={accentColor} />
            <ThemedText style={styles.cardTitle}>Notificação Personalizada</ThemedText>
          </View>

          <View style={styles.customSection}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Título:</ThemedText>
              <TextInput
                style={[styles.input, { borderColor: borderColor }]}
                value={testTitle}
                onChangeText={setTestTitle}
                placeholder="Digite o título da notificação"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Mensagem:</ThemedText>
              <TextInput
                style={[styles.input, styles.textArea, { borderColor: borderColor }]}
                value={testBody}
                onChangeText={setTestBody}
                placeholder="Digite a mensagem da notificação"
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity
              style={[styles.customButton, { backgroundColor: accentColor }]}
              onPress={handleCustomNotification}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Ionicons name="paper-plane" size={20} color="white" />
              )}
              <ThemedText style={styles.customButtonText}>
                Enviar Notificação Personalizada
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
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
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.7,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  tokenSection: {
    gap: 12,
  },
  tokenContainer: {
    gap: 12,
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  noTokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  noTokenText: {
    flex: 1,
    fontSize: 14,
    color: '#856404',
  },
  testSection: {
    gap: 12,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  testButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  permissionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  customSection: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  customButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
