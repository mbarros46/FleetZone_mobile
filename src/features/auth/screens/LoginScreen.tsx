import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { ThemedText, ThemedView } from '../../../components';
import { useAccentColor } from '../../../styles/theme';
import { useAuth } from '../../../contexts/auth';
import { AuthForm } from '../components/AuthForm';
import { MaterialColors, MaterialComponents, MaterialTypography } from '../../../styles/materialDesign';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

export function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { accentColor } = useAccentColor();
  const { login, loading } = useAuth();

  const handleLogin = async (data: { email: string; senha: string }) => {
    try {
      await login(data.email, data.senha);
      // Navigation will be handled automatically by the authentication state
    } catch (error: any) {
      // Error handling is done in AuthForm
      console.log('Login error handled in form:', error.message);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  if (loading) {
    return (
      <ThemedView style={[MaterialComponents.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={MaterialColors.primary} />
        <ThemedText style={[MaterialTypography.bodyLarge, styles.loadingText]}>
          Carregando...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView 
      style={[MaterialComponents.container]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedView style={[MaterialComponents.container, styles.container]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: MaterialColors.primaryContainer }]}>
            <Ionicons name="log-in" size={40} color={MaterialColors.onPrimaryContainer} />
          </View>
          <ThemedText style={[MaterialTypography.headlineMedium, styles.title]}>
            Bem-vindo de volta!
          </ThemedText>
          <ThemedText style={[MaterialTypography.bodyLarge, styles.subtitle]}>
            Faça login para acessar sua conta FleetZone
          </ThemedText>
        </View>

        {/* Form */}
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          onNavigate={navigateToRegister}
          loading={loading}
        />

        {/* Helper Text */}
        <View style={styles.helperSection}>
          <Ionicons name="information-circle" size={16} color="#999" />
          <ThemedText style={styles.helperText}>
            Use suas credenciais para acessar o sistema FleetZone
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: MaterialColors.onSurface,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: MaterialColors.onSurface,
  },
  subtitle: {
    textAlign: 'center',
    color: MaterialColors.onSurfaceVariant,
    paddingHorizontal: 16,
  },
  helperSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  helperText: {
    ...MaterialTypography.bodySmall,
    color: MaterialColors.onSurfaceVariant,
    lineHeight: 20,
    flex: 1,
  },
});
