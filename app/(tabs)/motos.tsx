// motos.tsx atualizado com texto preto para melhor visibilidade
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const motosMock = [
  { id: '1', modelo: 'Honda CG 160', placa: 'ABC-1234', status: 'Disponível' },
  { id: '2', modelo: 'Yamaha Fazer 250', placa: 'XYZ-5678', status: 'Em manutenção' },
  { id: '3', modelo: 'Honda Biz 125', placa: 'DEF-9012', status: 'Disponível' },
  { id: '4', modelo: 'Yamaha Crosser 150', placa: 'GHI-3456', status: 'Indisponível' },
];

export default function MotosScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Motos Disponíveis</ThemedText>
      <FlatList
        data={motosMock}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              router.push(`/detalhes?modelo=${encodeURIComponent(item.modelo)}&placa=${encodeURIComponent(item.placa)}`)
            }
          >
            <ThemedText style={[styles.itemText, styles.darkText]}>{item.modelo}</ThemedText>
            <ThemedText style={[styles.itemText, styles.darkText]}>{item.placa}</ThemedText>
            <ThemedText style={[styles.status, getStatusStyle(item.status)]}>{item.status}</ThemedText>
          </TouchableOpacity>
        )}
      />
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
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: { fontSize: 16 },
  status: { marginTop: 8, fontWeight: 'bold' },
  darkText: { color: 'black' },
});
