import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const COR_DESTAQUE_KEY = '@fleetzone_cor_destaque';
const MODO_ESCURO_KEY = '@fleetzone_modo_escuro';

export default function ConfiguracoesScreen() {
  const [corDestaque, setCorDestaque] = useState('');
  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    loadConfiguracoes();
  }, []);

  const loadConfiguracoes = async () => {
    try {
      const corSalva = await AsyncStorage.getItem(COR_DESTAQUE_KEY);
      const modoEscuroSalvo = await AsyncStorage.getItem(MODO_ESCURO_KEY);
      if (corSalva) setCorDestaque(corSalva);
      if (modoEscuroSalvo) setModoEscuro(modoEscuroSalvo === 'true');
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as configurações');
    }
  };

  const salvarConfiguracoes = async () => {
    try {
      await AsyncStorage.setItem(COR_DESTAQUE_KEY, corDestaque);
      await AsyncStorage.setItem(MODO_ESCURO_KEY, modoEscuro.toString());
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

        <ThemedView style={styles.switchContainer}>
          <ThemedText style={styles.label}>Modo Escuro:</ThemedText>
          <Switch value={modoEscuro} onValueChange={setModoEscuro} />
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={salvarConfiguracoes}>
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
  label: { fontSize: 16, fontWeight: 'bold' },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0a7ea4',
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
