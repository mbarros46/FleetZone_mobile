import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ControlledInput, ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useAuth } from '../../src/contexts/auth';

export default function LoginScreen() {
  const { accentColor } = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const { login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setIsLoading(true);
      await login(email.trim(), senha);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erro no Login', error.message || 'Credenciais inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push('/auth/register');
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
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
              <Ionicons name="log-in" size={32} color={accentColor} />
            </View>
            <ThemedText type="title" style={styles.title}>
              Bem-vindo de volta!
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Faça login para acessar sua conta FleetZone
            </ThemedText>
          </View>

          {/* Form Card */}
          <ThemedView style={[styles.formCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
            <View style={styles.formHeader}>
              <Ionicons name="person" size={20} color={accentColor} />
              <ThemedText style={styles.formTitle}>Dados de Acesso</ThemedText>
            </View>

            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputSection}>
                <View style={styles.inputHeader}>
                  <Ionicons name="mail" size={16} color="#666" />
                  <ThemedText style={styles.inputLabel}>E-mail</ThemedText>
                </View>
                <ControlledInput
                  name="email"
                  control={{ field: { onChange: setEmail, value: email } } as any}
                  label=""
                  error={null}
                  style={styles.input}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputSection}>
                <View style={styles.inputHeader}>
                  <Ionicons name="lock-closed" size={16} color="#666" />
                  <ThemedText style={styles.inputLabel}>Senha</ThemedText>
                </View>
                <View style={styles.passwordContainer}>
                  <ControlledInput
                    name="senha"
                    control={{ field: { onChange: setSenha, value: senha } } as any}
                    label=""
                    error={null}
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Sua senha"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { backgroundColor: accentColor },
                  (isLoading || loading) && styles.buttonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading || loading}
                activeOpacity={0.8}
              >
                {isLoading || loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="white" size="small" />
                    <ThemedText style={styles.buttonText}>Entrando...</ThemedText>
                  </View>
                ) : (
                  <View style={styles.buttonContent}>
                    <Ionicons name="log-in" size={20} color="white" />
                    <ThemedText style={styles.buttonText}>Entrar</ThemedText>
                  </View>
                )}
              </TouchableOpacity>

              {/* Register Link */}
              <View style={styles.registerSection}>
                <ThemedText style={styles.registerText}>
                  Não tem uma conta?{' '}
                </ThemedText>
                <TouchableOpacity onPress={navigateToRegister}>
                  <ThemedText style={[styles.registerLink, { color: accentColor }]}>
                    Cadastre-se
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>

          {/* Helper Text */}
          <View style={styles.helperSection}>
            <Ionicons name="information-circle" size={16} color="#999" />
            <ThemedText style={styles.helperText}>
              Use suas credenciais para acessar o sistema FleetZone
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
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
  formCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    gap: 20,
  },
  inputSection: {
    gap: 8,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    color: '#1a1a1a',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 14,
    padding: 4,
  },
  loginButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 8,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  registerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
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

