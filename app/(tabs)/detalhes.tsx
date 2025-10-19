import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';

import { ControlledInput, ThemedText, ThemedView } from '../../src/components';
import AppButton from '../../src/components/AppButton';
import Stack from '../../src/components/Stack';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';

const buscaSchema = z.object({
  placa: z
    .string()
    .min(1, 'Placa é obrigatória')
    .regex(/^[A-Z]{3}-\d{4}$/, 'Placa deve seguir o formato ABC-1234')
    .toUpperCase(),
});

type BuscaForm = z.infer<typeof buscaSchema>;

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
  const [motoSelecionada, setMotoSelecionada] = useState<
    (typeof motosMock)[0] | null
  >(null);
  const { accentColor } = useAccentColor();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BuscaForm>({
    resolver: zodResolver(buscaSchema),
    defaultValues: {
      placa: '',
    },
  });

  const onSubmit = async (data: BuscaForm) => {
    try {
      // Simular busca na API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const moto = motosMock.find(
        (m) => m.placa.toLowerCase() === data.placa.toLowerCase(),
      );
      if (moto) {
        setMotoSelecionada(moto);
      } else {
        setMotoSelecionada(null);
        Alert.alert('Moto não encontrada', 'Verifique a chave/placa digitada.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar a moto. Tente novamente.');
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="search" size={32} color="#FF6B35" />
          </View>
          <ThemedText type="title" style={styles.title}>
            Buscar Motocicleta
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Digite a placa para visualizar os detalhes
          </ThemedText>
        </View>

        {/* Quick Search Buttons */}
        <View style={styles.quickSearchCard}>
          <ThemedText style={styles.quickSearchTitle}>🚀 Busca Rápida - Motos Disponíveis:</ThemedText>
            <Stack direction="row" spacing={12} style={styles.quickButtonsGrid}>
            {motosMock.map((moto) => (
              <TouchableOpacity
                key={moto.placa}
                style={styles.quickSearchButton}
                onPress={() => {
                  setValue('placa', moto.placa);
                  setMotoSelecionada(moto);
                  Alert.alert('Moto Encontrada!', `${moto.modelo} carregada com sucesso.`);
                }}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.quickSearchButtonText}>{moto.placa}</ThemedText>
                <ThemedText style={styles.quickSearchButtonModel}>{moto.modelo}</ThemedText>
              </TouchableOpacity>
            ))}
            </Stack>
        </View>

        {/* Search Card */}
        <View style={styles.searchCard}>
          <View style={styles.searchHeader}>
            <Ionicons name="document-text" size={20} color="#FF6B35" />
            <ThemedText style={styles.searchTitle}>Consulta por Placa</ThemedText>
          </View>

          <ControlledInput
            name="placa"
            control={control}
            placeholder="Digite a placa (ABC-1234)"
            error={errors.placa}
            autoCapitalize="characters"
            maxLength={8}
          />

          <AppButton
            title="Buscar Motocicleta"
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit) as any}
            style={[styles.searchButton, { backgroundColor: accentColor }]}
          />
        </View>

        {/* Reset Button */}
        {motoSelecionada && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setMotoSelecionada(null);
              setValue('placa', '');
              Alert.alert('Busca Limpa', 'Você pode fazer uma nova busca agora.');
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={16} color="#666" />
            <ThemedText style={styles.resetButtonText}>Nova Busca</ThemedText>
          </TouchableOpacity>
        )}

        {/* Moto Details Card */}
        {motoSelecionada && (
          <View style={styles.motoCard}>
            <View style={styles.motoHeader}>
              <ThemedText style={styles.motoTitle}>
                {motoSelecionada.modelo}
              </ThemedText>
              <View style={styles.statusBadge}>
                <Ionicons 
                  name={motoSelecionada.status === 'Disponível' ? 'checkmark-circle' : 
                        motoSelecionada.status === 'Em manutenção' ? 'construct' : 'close-circle'} 
                  size={16} 
                  color={getStatusColor(motoSelecionada.status)}
                  style={{ marginRight: 6 }}
                />
                <ThemedText style={[styles.statusText, { color: getStatusColor(motoSelecionada.status) }]}>
                  {motoSelecionada.status}
                </ThemedText>
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Placa</ThemedText>
                <ThemedText style={styles.infoValue}>{motoSelecionada.placa}</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Pátio</ThemedText>
                <ThemedText style={styles.infoValue}>{motoSelecionada.patio}</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Data de Entrada</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {new Date(motoSelecionada.dataEntrada).toLocaleDateString('pt-BR')}
                </ThemedText>
              </View>

              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Quilometragem</ThemedText>
                <ThemedText style={styles.infoValue}>{motoSelecionada.km.toLocaleString()} km</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Próxima Manutenção</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {new Date(motoSelecionada.manutencao).toLocaleDateString('pt-BR')}
                </ThemedText>
              </View>
            </View>
          </View>
        )}
      </ThemedView>
    </ScrollView>
  );
}

function getStatusColor(status: string) {
  if (status === 'Disponível') return '#4CAF50';
  if (status === 'Em manutenção') return '#FF9800';
  return '#F44336';
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  searchCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // use marginRight on icon/text instead of gap
    marginBottom: 16,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  motoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  motoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  motoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    // use margin on status icon instead of gap
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoGrid: {
    // spacing between rows handled by margin/padding
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 16,
    // use margin between children instead of gap
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  resetButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  quickSearchCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickSearchTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  quickButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // use Stack wrapper in markup for spacing or margins on children
  },
  quickSearchButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    alignItems: 'center',
    minWidth: 100,
  },
  quickSearchButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  quickSearchButtonModel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
});
