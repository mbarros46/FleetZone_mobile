import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
// Button removed from Home; language selection is in Configurações
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText, ThemedView } from '../../src/components';
import AppButton from '../../src/components/AppButton';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import '../../src/locales';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { accentColor } = useAccentColor();
  const navigation = useNavigation();
  const surfaceColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'border');
  const { t } = useTranslation();
  
  return (
  <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[accentColor, `${accentColor}88`]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="bicycle" size={60} color="white" />
          <ThemedText type="title" style={styles.title}>
            {t('home.title')}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {t('home.subtitle')}
          </ThemedText>
        </View>
      </LinearGradient>

      <ThemedView style={styles.container}>
        <ThemedView style={styles.statsContainer}>
          <ThemedView style={[styles.statCard, { backgroundColor: surfaceColor, borderColor: borderColor }]}>
            <Ionicons name="speedometer" size={24} color={accentColor} />
            <ThemedText style={styles.statNumber}>12</ThemedText>
            <ThemedText style={styles.statLabel}>{t('stats.active_motos')}</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.statCard, { backgroundColor: surfaceColor, borderColor: borderColor }]}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <ThemedText style={styles.statNumber}>8</ThemedText>
            <ThemedText style={styles.statLabel}>{t('stats.available')}</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.statCard, { backgroundColor: surfaceColor, borderColor: borderColor }]}>
            <Ionicons name="build" size={24} color="#FF9800" />
            <ThemedText style={styles.statNumber}>4</ThemedText>
            <ThemedText style={styles.statLabel}>{t('stats.maintenance')}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <AppButton
            title={t('buttons.view_motos')}
            icon="list"
            onPress={() => {
              // @ts-ignore - navegar para a aba Motos
              navigation.navigate('motos');
            }}
            style={[styles.primaryButton, { backgroundColor: accentColor }]}
          />

          <AppButton
            title={t('buttons.create_moto')}
            icon="add-circle"
            onPress={() => {
              // @ts-ignore - navegar para o formulário (criação)
              navigation.navigate('formulario');
            }}
            variant="outline"
            color={accentColor}
            style={[styles.secondaryButton, { backgroundColor: surfaceColor, borderColor: borderColor }]}
            textStyle={[styles.secondaryButtonText, { color: accentColor } as any]}
          />

          <AppButton
            title={t('buttons.settings')}
            icon="settings"
            onPress={() => {
              // @ts-ignore - abrir a aba configurações
              navigation.navigate('configuracoes');
            }}
            variant="outline"
            color={accentColor}
            style={[styles.secondaryButton, { backgroundColor: surfaceColor, borderColor: borderColor }]}
            textStyle={[styles.secondaryButtonText, { color: accentColor } as any]}
          />

          {/* Seção de Autenticação para teste */}
          <ThemedView style={styles.authSection}>
            <ThemedText style={styles.sectionTitle}>{t('auth.test_section')}</ThemedText>
            <TouchableOpacity 
              style={[styles.authButton, { backgroundColor: accentColor }]}
              onPress={() => {
                // @ts-ignore - navegar para tela de login
                navigation.navigate('auth/login');
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="log-in" size={20} color="white" style={styles.buttonIcon} />
              <ThemedText style={styles.primaryButtonText}>{t('auth.login')}</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.authButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => {
                // @ts-ignore - navegar para tela de registro
                navigation.navigate('auth/register');
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="person-add" size={20} color="white" style={styles.buttonIcon} />
              <ThemedText style={styles.primaryButtonText}>{t('auth.register')}</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          {/* Language selector removed from Home - kept only in Configurações page */}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  container: {
    padding: 20,
    marginTop: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    // substitui gap por marginRight em cada card
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
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
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  buttonContainer: {
    width: '100%',
    // use Stack or margins between buttons instead of gap
  },
  primaryButton: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonIcon: {
    marginRight: 8,
  },
  authSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 16,
    // spacing between auth buttons handled by margins
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.7,
  },
  authButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  langContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  langButton: { marginHorizontal: 8 },
});
