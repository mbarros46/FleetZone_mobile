import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ControlledInput } from '../../src/components';
import { useAuth } from '../../src/contexts/auth';
import { ThemedView } from '../../src/components/ThemedView';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await login(email, senha);
      console.log('Login realizado com sucesso');
    } catch (error: any) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>FleetZone</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
          </View>

          <View style={styles.form}>
            <ControlledInput
              name="email"
              control={{ field: { onChange: setEmail, value: email } } as any}
              label="Email"
              style={styles.input}
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <ControlledInput
              name="senha"
              control={{ field: { onChange: setSenha, value: senha } } as any}
              label="Senha"
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={goToRegister}>
              <Text style={styles.linkText}>
                Não tem conta? Cadastre-se aqui
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});