// explore.tsx atualizado com texto preto
import { useState } from 'react';
import { StyleSheet, FlatList, TextInput } from 'react-native';

import { ThemedText, ThemedView } from '../../src/components';

const dadosMockados = [
  {
    id: '1',
    modelo: 'Honda CG 160',
    patio: 'Pátio A',
    localizacao: 'São Paulo',
  },
  {
    id: '2',
    modelo: 'Yamaha Fazer 250',
    patio: 'Pátio B',
    localizacao: 'Campinas',
  },
  {
    id: '3',
    modelo: 'Honda Biz 125',
    patio: 'Pátio A',
    localizacao: 'São Paulo',
  },
  {
    id: '4',
    modelo: 'Yamaha Crosser 150',
    patio: 'Pátio C',
    localizacao: 'Santos',
  },
];

export default function ExploreScreen() {
  const [busca, setBusca] = useState('');

  const resultados = dadosMockados.filter(
    (item) =>
      item.modelo.toLowerCase().includes(busca.toLowerCase()) ||
      item.localizacao.toLowerCase().includes(busca.toLowerCase()) ||
      item.patio.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Explorar Motos
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Buscar por modelo, local ou pátio"
        value={busca}
        onChangeText={setBusca}
        placeholderTextColor="#888"
      />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText style={[styles.itemTitle, styles.darkText]}>
              {item.modelo}
            </ThemedText>
            <ThemedText style={[styles.itemText, styles.darkText]}>
              Pátio: {item.patio}
            </ThemedText>
            <ThemedText style={[styles.itemText, styles.darkText]}>
              Localização: {item.localizacao}
            </ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
  },
  item: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemText: { fontSize: 14 },
  darkText: { color: 'black' },
});
