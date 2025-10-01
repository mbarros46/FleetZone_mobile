import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';

export default function SobreScreen() {
  const { accentColor } = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  const appVersion = Constants.expoConfig?.version || '1.0.0';
  const buildVersion = Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode || '1';
  const environment = __DEV__ ? 'Desenvolvimento' : 'Produção';
  const commitHash = Constants.expoConfig?.extra?.commitHash || 'N/A';

  const handleOpenGitHub = () => {
    const githubUrl = 'https://github.com/seu-usuario/fleetzone-mobile';
    Linking.openURL(githubUrl).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o GitHub');
    });
  };

  const handleOpenDocumentation = () => {
    const docsUrl = 'https://docs.expo.dev/';
    Linking.openURL(docsUrl).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir a documentação');
    });
  };

  const handleOpenSupport = () => {
    const supportEmail = 'suporte@fleetzone.com';
    const subject = 'Suporte FleetZone Mobile';
    const body = 'Olá, preciso de ajuda com o aplicativo FleetZone Mobile.';
    
    const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o cliente de email');
    });
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
            <Ionicons name="information-circle" size={32} color={accentColor} />
          </View>
          <ThemedText type="title" style={styles.title}>
            Sobre o App
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Informações sobre o FleetZone Mobile
          </ThemedText>
        </View>

        {/* App Info Card */}
        <ThemedView style={[styles.infoCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="phone-portrait" size={20} color={accentColor} />
            <ThemedText style={styles.cardTitle}>Informações do App</ThemedText>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Nome do App:</ThemedText>
              <ThemedText style={styles.infoValue}>FleetZone Mobile</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Versão:</ThemedText>
              <ThemedText style={styles.infoValue}>{appVersion}</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Build:</ThemedText>
              <ThemedText style={styles.infoValue}>{buildVersion}</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Ambiente:</ThemedText>
              <ThemedText style={[styles.infoValue, { color: environment === 'Desenvolvimento' ? '#FF9800' : '#4CAF50' }]}>
                {environment}
              </ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Commit Hash:</ThemedText>
              <ThemedText style={[styles.infoValue, styles.commitHash]}>{commitHash}</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Tech Stack Card */}
        <ThemedView style={[styles.infoCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="code-slash" size={20} color={accentColor} />
            <ThemedText style={styles.cardTitle}>Tecnologias</ThemedText>
          </View>

          <View style={styles.techList}>
            <View style={styles.techItem}>
              <Ionicons name="logo-react" size={16} color="#61DAFB" />
              <ThemedText style={styles.techText}>React Native</ThemedText>
            </View>
            <View style={styles.techItem}>
              <Ionicons name="logo-javascript" size={16} color="#F7DF1E" />
              <ThemedText style={styles.techText}>TypeScript</ThemedText>
            </View>
            <View style={styles.techItem}>
              <Ionicons name="cube" size={16} color="#000020" />
              <ThemedText style={styles.techText}>Expo</ThemedText>
            </View>
            <View style={styles.techItem}>
              <Ionicons name="server" size={16} color="#4CAF50" />
              <ThemedText style={styles.techText}>API REST</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Actions Card */}
        <ThemedView style={[styles.infoCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="link" size={20} color={accentColor} />
            <ThemedText style={styles.cardTitle}>Links Úteis</ThemedText>
          </View>

          <View style={styles.actionsList}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleOpenGitHub}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-github" size={20} color="#333" />
              <ThemedText style={styles.actionText}>Código Fonte</ThemedText>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleOpenDocumentation}
              activeOpacity={0.7}
            >
              <Ionicons name="document-text" size={20} color="#333" />
              <ThemedText style={styles.actionText}>Documentação</ThemedText>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleOpenSupport}
              activeOpacity={0.7}
            >
              <Ionicons name="mail" size={20} color="#333" />
              <ThemedText style={styles.actionText}>Suporte</ThemedText>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Desenvolvido com ❤️ para gerenciar frotas de motocicletas
          </ThemedText>
          <ThemedText style={styles.footerText}>
            © 2024 FleetZone. Todos os direitos reservados.
          </ThemedText>
        </View>
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
  infoSection: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  commitHash: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  techList: {
    gap: 12,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  techText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  actionsList: {
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    gap: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});
