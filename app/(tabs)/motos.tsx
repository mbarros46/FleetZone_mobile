import { StyleSheet, FlatList, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';

const motosMock = [
  { id: '1', modelo: 'Honda CG 160', placa: 'ABC-1234', status: 'Disponível' },
  {
    id: '2',
    modelo: 'Yamaha Fazer 250',
    placa: 'XYZ-5678',
    status: 'Em manutenção',
  },
  { id: '3', modelo: 'Honda Biz 125', placa: 'DEF-9012', status: 'Disponível' },
  {
    id: '4',
    modelo: 'Yamaha Crosser 150',
    placa: 'GHI-3456',
    status: 'Indisponível',
  },
];

export default function MotosScreen() {
  const { accentColor } = useAccentColor();

  const getStatusIcon = (status: string) => {
    if (status === 'Disponível') return 'checkmark-circle';
    if (status === 'Em manutenção') return 'construct';
    return 'close-circle';
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Frota de Motocicletas
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {motosMock.length} motos cadastradas
        </ThemedText>
      </View>
      
      <FlatList
        data={motosMock}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.motoCard}
            onPress={() => {
              Alert.alert(
                `🏍️ ${item.modelo}`,
                `📋 Placa: ${item.placa}\n🔧 Status: ${item.status}\n\n💡 Dica: Use a aba "Detalhes" para buscar informações completas por placa!`,
                [
                  { text: 'Ver Detalhes', onPress: () => Alert.alert('Navegação', 'Vá para a aba "Detalhes" e digite a placa para ver informações completas.') },
                  { text: 'Fechar', style: 'cancel' }
                ]
              );
            }}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <View style={styles.motoIcon}>
                <Ionicons name="bicycle" size={24} color={accentColor} />
              </View>
              <View style={styles.statusBadge}>
                <Ionicons 
                  name={getStatusIcon(item.status)} 
                  size={16} 
                  color={getStatusColor(item.status)}
                />
                <ThemedText style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status}
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.motoInfo}>
              <ThemedText style={styles.motoModel}>
                {item.modelo}
              </ThemedText>
              <View style={styles.placaContainer}>
                <Ionicons name="document-text" size={16} color="#666" />
                <ThemedText style={styles.placaText}>
                  {item.placa}
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.cardActions}>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

function getStatusColor(status: string) {
  if (status === 'Disponível') return '#4CAF50';
  if (status === 'Em manutenção') return '#FF9800';
  return '#F44336';
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fafafa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: { 
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  motoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  motoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  motoInfo: {
    marginBottom: 12,
  },
  motoModel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  placaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  placaText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'monospace',
  },
  cardActions: {
    alignItems: 'flex-end',
  },
});
