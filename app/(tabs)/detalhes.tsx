// detalhes.tsx com busca por chave/placa da moto
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAccentColor } from '../../src/styles/theme';

const motosMock = [
  {
    modelo: 'Honda CG 160',
    placa: 'ABC-1234',
    status: 'Disponível',
    dataEntrada: '2025-04-10',
    patio: 'Pátio A',
    km: 15320,
    manutencao: '2025-05-15',
  },
  {
    modelo: 'Yamaha Fazer 250',
    placa: 'XYZ-5678',
    status: 'Em manutenção',
    dataEntrada: '2025-04-12',
    patio: 'Pátio B',
    km: 24800,
    manutencao: '2025-06-01',
  },
];

export default function DetalhesScreen() {
  const [placa, setPlaca] = useState('');
  const [motoSelecionada, setMotoSelecionada] = useState<typeof motosMock[0] | null>(null);
  const { accentColor } = useAccentColor();

  const buscarMoto = () => {
    const moto = motosMock.find((m) => m.placa.toLowerCase() === placa.toLowerCase());
    if (moto) {
      setMotoSelecionada(moto);
    } else {
      setMotoSelecionada(null);
      Alert.alert('Moto não encontrada', 'Verifique a chave/placa digitada.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Buscar Moto por Chave</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Digite a placa (ex: ABC-1234)"
        value={placa}
        onChangeText={setPlaca}
        placeholderTextColor="#999"
      />

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: accentColor }]} 
        onPress={buscarMoto}
      >
        <ThemedText style={styles.buttonText}>Buscar</ThemedText>
      </TouchableOpacity>

      {motoSelecionada && (
        <ThemedView style={styles.infoBox}>
          <ThemedText style={styles.label}>🛵 Modelo:</ThemedText>
          <ThemedText style={styles.value}>{motoSelecionada.modelo}</ThemedText>

          <ThemedText style={styles.label}>📄 Placa:</ThemedText>
          <ThemedText style={styles.value}>{motoSelecionada.placa}</ThemedText>

          <ThemedText style={styles.label}>🏢 Pátio:</ThemedText>
          <ThemedText style={styles.value}>{motoSelecionada.patio}</ThemedText>

          <ThemedText style={styles.label}>📅 Data de Entrada:</ThemedText>
          <ThemedText style={styles.value}>{motoSelecionada.dataEntrada}</ThemedText>

          <ThemedText style={styles.label}>🕒 Km Rodados:</ThemedText>
          <ThemedText style={styles.value}>{motoSelecionada.km} km</ThemedText>

          <ThemedText style={styles.label}>🧰 Status:</ThemedText>
          <ThemedText style={[styles.value, getStatusStyle(motoSelecionada.status)]}>{motoSelecionada.status}</ThemedText>

          <ThemedText style={styles.label}>🔧 Próxima Manutenção:</ThemedText>
          <ThemedText style={styles.value}>{motoSelecionada.manutencao}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

function getStatusStyle(status: string) {
  if (status === 'Disponível') return { color: 'green' };
  if (status === 'Em manutenção') return { color: 'orange' };
  return { color: 'red' };
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    gap: 10,
  },
  label: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  value: { fontSize: 16, color: 'black' },
});
