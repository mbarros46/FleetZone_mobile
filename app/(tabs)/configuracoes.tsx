import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Switch, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeCustom } from '../../src/contexts/theme';
import { useAccentColor } from '../../src/styles/theme';

export default function ConfiguracoesScreen() {
  const { mode, setMode } = useThemeCustom();
  const { accentColor, saveAccentColor } = useAccentColor();
  const [corDestaque, setCorDestaque] = useState('');

  useEffect(() => {
    setCorDestaque(accentColor);
  }, [accentColor]);

  const salvarConfiguracoes = async () => {
    try {
      if (corDestaque) {
        await saveAccentColor(corDestaque);
      }
      Alert.alert('Sucesso', 'Configurações salvas!');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Configurações</ThemedText>

      <ThemedView style={styles.form}>
        <ThemedText style={styles.label}>Cor de Destaque:</ThemedText>
        <TextInput
          style={styles.input}
          value={corDestaque}
          onChangeText={setCorDestaque}
          placeholder="Digite a cor (ex: #FF0000)"
          placeholderTextColor="#999"
        />

        <ThemedView style={styles.themeContainer}>
          <ThemedText style={styles.label}>Tema:</ThemedText>
          
          <TouchableOpacity 
            style={[styles.themeOption, mode === 'light' && styles.themeOptionSelected]}
            onPress={() => setMode('light')}
          >
            <ThemedText style={styles.themeOptionText}>☀️ Claro</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.themeOption, mode === 'dark' && styles.themeOptionSelected]}
            onPress={() => setMode('dark')}
          >
            <ThemedText style={styles.themeOptionText}>🌙 Escuro</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.themeOption, mode === 'system' && styles.themeOptionSelected]}
            onPress={() => setMode('system')}
          >
            <ThemedText style={styles.themeOptionText}>📱 Sistema</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: accentColor }]} 
          onPress={salvarConfiguracoes}
        >
          <ThemedText style={styles.buttonText}>Salvar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginBottom: 30, textAlign: 'center' },
  form: { gap: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  themeContainer: {
    gap: 10,
  },
  themeOption: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionSelected: {
    borderColor: '#0a7ea4',
    backgroundColor: '#e6f3f7',
  },
  themeOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
