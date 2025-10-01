import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText, ThemedView } from '../../../components';
import { useAccentColor } from '../../../styles/theme';
import { MaterialColors, MaterialComponents, MaterialTypography } from '../../../styles/materialDesign';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; senha: string; nome?: string; confirmarSenha?: string }) => Promise<void>;
  onNavigate: () => void;
  loading?: boolean;
}

export function AuthForm({ type, onSubmit, onNavigate, loading = false }: AuthFormProps) {
  const { accentColor } = useAccentColor();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const validateForm = () => {
    if (type === 'register') {
      if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
        return false;
      }

      if (nome.length < 2) {
        Alert.alert('Erro', 'Nome deve ter pelo menos 2 caracteres');
        return false;
      }

      if (!email.includes('@') || !email.includes('.')) {
        Alert.alert('Erro', 'Email deve ter um formato válido');
        return false;
      }

      if (senha.length < 6) {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
        return false;
      }

      if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não coincidem');
        return false;
      }
    } else {
      if (!email.trim() || !senha.trim()) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const data = type === 'register' 
        ? { nome: nome.trim(), email: email.trim(), senha, confirmarSenha }
        : { email: email.trim(), senha };
      
      await onSubmit(data);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao processar');
    } finally {
      setIsLoading(false);
    }
  };

  const isLogin = type === 'login';

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={[MaterialComponents.elevatedCard, styles.formCard]}>
        <View style={styles.formHeader}>
          <Ionicons name={isLogin ? "person" : "person-add"} size={24} color={MaterialColors.primary} />
          <ThemedText style={[MaterialTypography.titleMedium, styles.formTitle]}>
            {isLogin ? 'Dados de Acesso' : 'Dados Pessoais'}
          </ThemedText>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputSection}>
              <ThemedText style={[MaterialTypography.labelMedium, styles.inputLabel]}>
                Nome Completo
              </ThemedText>
              <TextInput
                value={nome}
                onChangeText={setNome}
                style={[MaterialComponents.textInput, styles.input]}
                placeholder="Seu nome completo"
                placeholderTextColor={MaterialColors.onSurfaceVariant}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          )}

          <View style={styles.inputSection}>
            <ThemedText style={[MaterialTypography.labelMedium, styles.inputLabel]}>
              E-mail
            </ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={[MaterialComponents.textInput, styles.input]}
              placeholder="seu@email.com"
              placeholderTextColor={MaterialColors.onSurfaceVariant}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputSection}>
            <ThemedText style={[MaterialTypography.labelMedium, styles.inputLabel]}>
              Senha
            </ThemedText>
            <View style={styles.passwordContainer}>
              <TextInput
                value={senha}
                onChangeText={setSenha}
                style={[MaterialComponents.textInput, styles.input, styles.passwordInput]}
                placeholder={isLogin ? "Sua senha" : "Mínimo 6 caracteres"}
                placeholderTextColor={MaterialColors.onSurfaceVariant}
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
                  size={24} 
                  color={MaterialColors.onSurfaceVariant} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {!isLogin && (
            <View style={styles.inputSection}>
              <ThemedText style={[MaterialTypography.labelMedium, styles.inputLabel]}>
                Confirmar Senha
              </ThemedText>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  style={[MaterialComponents.textInput, styles.input, styles.passwordInput]}
                  placeholder="Digite a senha novamente"
                  placeholderTextColor={MaterialColors.onSurfaceVariant}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off" : "eye"} 
                    size={24} 
                    color={MaterialColors.onSurfaceVariant} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[
              MaterialComponents.filledButton,
              styles.submitButton,
              (isLoading || loading) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading || loading}
            activeOpacity={0.8}
          >
            {isLoading || loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={MaterialColors.onPrimary} size="small" />
                <ThemedText style={[MaterialComponents.filledButtonText, styles.buttonText]}>
                  {isLogin ? 'Entrando...' : 'Criando conta...'}
                </ThemedText>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name={isLogin ? "log-in" : "person-add"} size={20} color={MaterialColors.onPrimary} />
                <ThemedText style={[MaterialComponents.filledButtonText, styles.buttonText]}>
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.navigationSection}>
            <ThemedText style={[MaterialTypography.bodyMedium, styles.navigationText]}>
              {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            </ThemedText>
            <TouchableOpacity onPress={onNavigate}>
              <ThemedText style={[MaterialTypography.labelLarge, styles.navigationLink, { color: MaterialColors.primary }]}>
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formCard: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  formTitle: {
    color: MaterialColors.onSurface,
  },
  form: {
    gap: 20,
  },
  inputSection: {
    gap: 8,
  },
  inputLabel: {
    color: MaterialColors.onSurface,
    marginBottom: 4,
  },
  input: {
    color: MaterialColors.onSurface,
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
    top: 16,
    padding: 4,
  },
  submitButton: {
    marginTop: 12,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    marginLeft: 0,
  },
  navigationSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  navigationText: {
    color: MaterialColors.onSurfaceVariant,
  },
  navigationLink: {
    textDecorationLine: 'underline',
  },
});