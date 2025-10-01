import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText, ThemedView } from '../../../components';
import { useAccentColor } from '../../../styles/theme';
import { useAuth } from '../../../contexts/auth';
import { AuthForm } from '../components/AuthForm';

export function RegisterScreen() {
  const { accentColor } = useAccentColor();
  const { register, loading } = useAuth();

  const handleRegister = async (data: { nome: string; email: string; senha: string; confirmarSenha: string }) => {
    await register(data.nome, data.email, data.senha);
    Alert.alert(
      'Sucesso!',
      'Conta criada com sucesso! Você já está logado.',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
    );
  };

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={accentColor} />
        <ThemedText style={styles.loadingText}>Carregando...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
            <Ionicons name="person-add" size={32} color={accentColor} />
          </View>
          <ThemedText type="title" style={styles.title}>
            Criar Conta
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Preencha os dados abaixo para criar sua conta FleetZone
          </ThemedText>
        </View>

        {/* Form */}
        <AuthForm
          type="register"
          onSubmit={handleRegister}
          onNavigate={navigateToLogin}
          loading={loading}
        />

        {/* Helper Text */}
        <View style={styles.helperSection}>
          <Ionicons name="information-circle" size={16} color="#999" />
          <ThemedText style={styles.helperText}>
            Sua conta será criada e você já estará logado automaticamente
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
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 20,
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
  helperSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  helperText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    flex: 1,
  },
});
