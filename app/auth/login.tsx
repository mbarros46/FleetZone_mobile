import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../src/contexts';
import { useLanguage } from '../../src/contexts';
import { t } from '../../src/i18n';
import AppButton from '../../src/components/AppButton';
import { useAccentColor } from '../../src/styles/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { accentColor } = useAccentColor();
  const navigation = useNavigation();
  const { login } = useAuth();
  const { lang } = useLanguage();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', t('fill_data', lang));
      return;
    }

    setLoading(true);
    try {
  await login(email, password);
  Alert.alert('Sucesso', t('enter', lang));
  // navegar para as tabs principais
  // navegar para as tabs principais
  // @ts-ignore - navigation types depend on expo-router integration
  navigation.navigate('(tabs)');
    } catch (error) {
      const message = (error as any)?.message ?? 'Falha no login. Verifique suas credenciais.';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>FleetZone</Text>
          <Text style={styles.subtitle}>{t('login_subtitle', lang)}</Text>

          <View style={styles.formContainer}>
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
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <AppButton
              title={loading ? t('enter', lang) + '...' : t('enter', lang)}
              loading={loading}
              onPress={handleLogin}
              style={[styles.loginButton, { backgroundColor: accentColor }]}
            />

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>{lang === 'es' ? '¿No tienes una cuenta?' : 'Não tem uma conta? '}</Text>
              <AppButton
                title={t('register', lang)}
                variant="outline"
                color={accentColor}
                onPress={() => {
                  // @ts-ignore - navegar para tela de registro
                  navigation.navigate('auth/register');
                }}
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  formContainer: {
    // `gap` não é compatível com todas as versões do React Native.
    // Substituído por espaçamento manual entre elementos.
    // Mantemos padding vertical onde necessário.
    paddingVertical: 8,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});