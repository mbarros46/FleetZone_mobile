import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { motosService, MotoDTO } from '../../src/services/motosService';
import { useAuth } from '../../src/contexts/auth';

export default function MotosScreen() {
  const { accentColor } = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const { token } = useAuth();

  const [data, setData] = useState<MotoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const list = await motosService.list(token ?? undefined);
      setData(list);
    } catch (e: any) {
      Alert.alert('Erro', e.message ?? 'Falha ao carregar motos');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id?: number) => {
    if (!id) return;
    Alert.alert('Excluir', 'Confirmar exclusão desta moto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await motosService.remove(id, token ?? undefined);
            await load();
          } catch (e: any) {
            Alert.alert('Erro', e.message ?? 'Falha ao excluir');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <ThemedText style={{ marginTop: 8 }}>Carregando motos…</ThemedText>
      </ThemedView>
    );
  }

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
          {data.length} motos cadastradas
        </ThemedText>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.motoCard, { backgroundColor: cardColor, borderColor: borderColor }]}
            onPress={() => {
              Alert.alert(
                `🏍️ ${item.modelo}`,
                `📋 Placa: ${item.placa}\n🔧 Status: ${item.status || 'N/A'}\n\n💡 Dica: Use a aba "Detalhes" para buscar informações completas por placa!`,
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
                  name={getStatusIcon(item.status || '')} 
                  size={16} 
                  color={getStatusColor(item.status || '')}
                />
                <ThemedText style={[styles.statusText, { color: getStatusColor(item.status || '') }]}>
                  {item.status || 'N/A'}
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.motoInfo}>
              <ThemedText style={styles.motoModel}>
                {item.modelo}
              </ThemedText>
              <View style={styles.placaContainer}>
                <Ionicons name="document-text" size={16} color={useThemeColor({}, 'icon')} />
                <ThemedText style={styles.placaText}>
                  {item.placa}
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => remove(item.id)}>
                <Ionicons name="trash-outline" size={22} color={textColor} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <ThemedText style={{ textAlign: 'center', opacity: 0.7, marginTop: 24 }}>
            Nenhuma moto cadastrada.
          </ThemedText>
        }
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: accentColor }]}
        onPress={() => {
          // navegar para o formulário (criação)
          // em Expo Router, por ex.: router.push('/(tabs)/formulario');
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
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
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    opacity: 0.9,
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    width: 56, 
    height: 56, 
    borderRadius: 28,
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 3,
  },
});
