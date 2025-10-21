import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAccentColor } from '../../src/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../src/contexts';
import AppButton from '../../src/components/AppButton';
import { useLanguage } from '../../src/contexts';
import { t } from '../../src/i18n';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { accentColor } = useAccentColor();
  const navigation = useNavigation();
  const { register } = useAuth();
  const { lang } = useLanguage();

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', t('fill_data', lang));
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(name, email, password);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      // @ts-ignore - navigation types depend on expo-router integration
      navigation.navigate('(tabs)');
    } catch (error) {
      const message = (error as any)?.message ?? 'Falha no cadastro. Tente novamente.';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    // @ts-ignore
    navigation.navigate('auth/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('create_account', lang)}</Text>
          <Text style={styles.subtitle}>{t('fill_data', lang)}</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('name_label', lang)}</Text>
              <TextInput
                style={[styles.input, { borderColor: accentColor }]}
                placeholder="Seu nome completo"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('email_label', lang)}</Text>
              <TextInput
                style={[styles.input, { borderColor: accentColor }]}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('password_label', lang)}</Text>
              <TextInput
                style={[styles.input, { borderColor: accentColor }]}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('confirm_password_label', lang)}</Text>
              <TextInput
                style={[styles.input, { borderColor: accentColor }]}
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <AppButton
              title={loading ? t('create_account', lang) + '...' : t('create_account', lang)}
              loading={loading}
              onPress={handleRegister}
              style={[styles.registerButton, { backgroundColor: accentColor }]}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>{lang === 'es' ? '¿Ya tienes una cuenta?' : 'Já tem uma conta? '}</Text>
              <AppButton
                title="Faça login"
                variant="outline"
                color={accentColor}
                onPress={goToLogin}
                style={{ marginLeft: 8 }}
                textStyle={{ fontSize: 14 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#333' },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 40 },
  formContainer: { paddingVertical: 8 },
  inputContainer: { marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '500', color: '#333' },
  input: { borderWidth: 1.5, borderRadius: 8, padding: 16, fontSize: 16, backgroundColor: '#f9f9f9' },
  registerButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  loginText: { fontSize: 14, color: '#666' },
});