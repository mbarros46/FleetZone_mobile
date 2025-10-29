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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabOverflow } from '../../components/ui/TabBarBackground';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText, ThemedView } from '../../src/components';
import { useLanguage } from '../../src/contexts';
import { t } from '../../src/i18n';
import { useNavigation } from '@react-navigation/native';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { motosService, MotoDTO } from '../../src/services/motosService';
import { useAuth } from '../../src/contexts/auth';

export default function MotosScreen() {
  const { accentColor } = useAccentColor();
  const textColor = useThemeColor({}, 'text');
  const { token } = useAuth();
  const { lang } = useLanguage();

  const [data, setData] = useState<MotoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const bottomOverflow = useBottomTabOverflow?.() ?? 0;

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await motosService.list(token ?? undefined);
      setData(list);
    } catch (e: any) {
      const msg = e?.message ?? t('load_motos_fail', lang);
      setError(msg);
      Alert.alert(t('error_label', lang), msg);
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
    Alert.alert(t('delete_label', lang), t('delete_confirm', lang), [
      { text: t('cancel_label', lang), style: 'cancel' },
      {
        text: t('delete_label', lang),
        style: 'destructive',
        onPress: async () => {
          try {
            await motosService.remove(id, token ?? undefined);
            await load();
          } catch (e: any) {
            Alert.alert(t('error_label', lang), e.message ?? t('delete_fail', lang));
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={accentColor} />
        <ThemedText style={{ marginTop: 8 }}>Carregando motos…</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }] }>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(item.id ?? index)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              // @ts-ignore - navegar para o formulário com id
              navigation.navigate('formulario', { id: item.id });
            }}
            onLongPress={() => {
              Alert.alert(item.modelo, 'Ações', [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Editar',
                  onPress: () => {
                    // @ts-ignore
                    navigation.navigate('formulario', { id: item.id });
                  },
                },
                {
                  text: 'Excluir',
                  style: 'destructive',
                  onPress: () => remove(item.id),
                },
              ]);
            }}
          >
            <View style={{ flex: 1 }}>
              <ThemedText type="subtitle">{item.modelo}</ThemedText>
              <ThemedText style={{ opacity: 0.8 }}>{item.placa}</ThemedText>
              {!!item.status && <ThemedText style={{ opacity: 0.7 }}>Status: {item.status}</ThemedText>}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => remove(item.id)} style={{ marginLeft: 16 }}>
                <Ionicons name="trash-outline" size={22} color={textColor} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          error ? (
            <View style={{ alignItems: 'center', marginTop: 24 }}>
              <ThemedText style={{ textAlign: 'center', opacity: 0.9 }}>{error}</ThemedText>
              <TouchableOpacity onPress={load} style={{ marginTop: 12 }}>
                <ThemedText style={{ color: accentColor }}>Tentar novamente</ThemedText>
              </TouchableOpacity>
            </View>
          ) : (
            <ThemedText style={{ textAlign: 'center', opacity: 0.7, marginTop: 24 }}>
              Nenhuma moto cadastrada.
            </ThemedText>
          )
        }
        contentContainerStyle={{ paddingBottom: 24 + insets.bottom + bottomOverflow }}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: accentColor, bottom: 16 + insets.bottom + bottomOverflow }]}
        onPress={() => {
          // @ts-ignore - navegar para o formulário (criação)
          navigation.navigate('formulario');
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
    // spacing between children handled by margins on internal elements
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