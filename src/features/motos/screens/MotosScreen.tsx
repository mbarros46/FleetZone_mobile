import React, { useEffect, useState, useCallback } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  View, 
  Alert, 
  RefreshControl, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText, ThemedView } from '../../../components';
import { useAccentColor } from '../../../styles/theme';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { motosService, MotoDTO } from '../../../services/motosService';
import { useAuth } from '../../../contexts/auth';
import { MotoCard } from '../components/MotoCard';

export function MotosScreen() {
  const { accentColor } = useAccentColor();
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
          <MotoCard moto={item} onDelete={remove} />
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
