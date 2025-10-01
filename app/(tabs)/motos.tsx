import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { motosService, MotoDTO } from '../../src/services/motosService';
import { useAuth } from '../../src/contexts/auth';

export default function MotosScreen() {
  const { accentColor } = useAccentColor();
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

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={{ flex: 1 }}>
              <ThemedText type="subtitle">{item.modelo}</ThemedText>
              <ThemedText style={{ opacity: 0.8 }}>{item.placa}</ThemedText>
              {!!item.status && <ThemedText style={{ opacity: 0.7 }}>Status: {item.status}</ThemedText>}
            </View>
            <View style={{ flexDirection: 'row', gap: 16 }}>
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
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