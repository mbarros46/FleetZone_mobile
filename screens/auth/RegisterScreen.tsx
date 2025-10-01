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

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await register(nome, email, senha);
      console.log('Registro realizado com sucesso');
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
    } catch (error: any) {
      console.error('Erro no registro:', error);
      Alert.alert('Erro', error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>
          </View>

          <View style={styles.form}>
            <ControlledInput
              name="nome"
              control={{ field: { onChange: setNome, value: nome } } as any}
              label="Nome"
              style={styles.input}
              placeholder="Digite seu nome"
              autoCapitalize="words"
              autoCorrect={false}
            />

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

            <ControlledInput
              name="confirmarSenha"
              control={{ field: { onChange: setConfirmarSenha, value: confirmarSenha } } as any}
              label="Confirmar Senha"
              style={styles.input}
              placeholder="Digite a senha novamente"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={goToLogin}>
              <Text style={styles.linkText}>
                Já tem conta? Faça login aqui
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