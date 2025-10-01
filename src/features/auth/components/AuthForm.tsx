import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ControlledInput, ThemedText, ThemedView } from '../../../components';
import { useAccentColor } from '../../../styles/theme';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; senha: string; nome?: string; confirmarSenha?: string }) => Promise<void>;
  onNavigate: () => void;
  loading?: boolean;
}

export function AuthForm({ type, onSubmit, onNavigate, loading = false }: AuthFormProps) {
  const { accentColor } = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

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
      <ThemedView style={[styles.formCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
        <View style={styles.formHeader}>
          <Ionicons name={isLogin ? "person" : "person-add"} size={20} color={accentColor} />
          <ThemedText style={styles.formTitle}>
            {isLogin ? 'Dados de Acesso' : 'Dados Pessoais'}
          </ThemedText>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputSection}>
              <View style={styles.inputHeader}>
                <Ionicons name="person" size={16} color="#666" />
                <ThemedText style={styles.inputLabel}>Nome Completo</ThemedText>
              </View>
              <ControlledInput
                name="nome"
                control={{ field: { onChange: setNome, value: nome } } as any}
                label=""
                error={null}
                style={styles.input}
                placeholder="Seu nome completo"
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          )}

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
                placeholder={isLogin ? "Sua senha" : "Mínimo 6 caracteres"}
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

          {!isLogin && (
            <View style={styles.inputSection}>
              <View style={styles.inputHeader}>
                <Ionicons name="lock-closed" size={16} color="#666" />
                <ThemedText style={styles.inputLabel}>Confirmar Senha</ThemedText>
              </View>
              <View style={styles.passwordContainer}>
                <ControlledInput
                  name="confirmarSenha"
                  control={{ field: { onChange: setConfirmarSenha, value: confirmarSenha } } as any}
                  label=""
                  error={null}
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Digite a senha novamente"
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
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: accentColor },
              (isLoading || loading) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading || loading}
            activeOpacity={0.8}
          >
            {isLoading || loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="white" size="small" />
                <ThemedText style={styles.buttonText}>
                  {isLogin ? 'Entrando...' : 'Criando conta...'}
                </ThemedText>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name={isLogin ? "log-in" : "person-add"} size={20} color="white" />
                <ThemedText style={styles.buttonText}>
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.navigationSection}>
            <ThemedText style={styles.navigationText}>
              {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            </ThemedText>
            <TouchableOpacity onPress={onNavigate}>
              <ThemedText style={[styles.navigationLink, { color: accentColor }]}>
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
  submitButton: {
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
  navigationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  navigationText: {
    fontSize: 14,
    color: '#666',
  },
  navigationLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
