import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function FormularioScreen() {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');

  const handleSalvar = () => {
    Alert.alert(
      'Dados da Moto',
      `Modelo: ${modelo}\nPlaca: ${placa}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Cadastrar Nova Moto</ThemedText>
      
      <ThemedView style={styles.form}>
        <ThemedText style={styles.label}>Modelo da Moto:</ThemedText>
        <TextInput
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
          placeholder="Digite o modelo"
          placeholderTextColor="#999"
        />

        <ThemedText style={styles.label}>Placa da Moto:</ThemedText>
        <TextInput
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
          placeholder="Digite a placa"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <ThemedText style={styles.buttonText}>Salvar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0a7ea4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 