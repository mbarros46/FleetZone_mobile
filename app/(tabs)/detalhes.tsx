// detalhes.tsx com busca por chave/placa da moto
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { z } from 'zod';

import { ControlledInput, ThemedText, ThemedView } from '../../src/components';
import { commonStyles } from '../../src/styles/common';
import { useAccentColor } from '../../src/styles/theme';

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
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Buscar Moto por Chave
      </ThemedText>

      <ControlledInput
        name="placa"
        control={control}
        label="Placa da Moto:"
        placeholder="Digite a placa (ABC-1234)"
        error={errors.placa}
        autoCapitalize="characters"
        maxLength={8}
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: accentColor },
          isSubmitting && styles.buttonDisabled,
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <ThemedText style={styles.buttonText}>Buscar</ThemedText>
        )}
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
          <ThemedText style={styles.value}>
            {motoSelecionada.dataEntrada}
          </ThemedText>

          <ThemedText style={styles.label}>🕒 Km Rodados:</ThemedText>
          <ThemedText style={styles.value}>{motoSelecionada.km} km</ThemedText>

          <ThemedText style={styles.label}>🧰 Status:</ThemedText>
          <ThemedText
            style={[styles.value, getStatusStyle(motoSelecionada.status)]}
          >
            {motoSelecionada.status}
          </ThemedText>

          <ThemedText style={styles.label}>🔧 Próxima Manutenção:</ThemedText>
          <ThemedText style={styles.value}>
            {motoSelecionada.manutencao}
          </ThemedText>
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
  ...commonStyles,
  container: {
    ...commonStyles.container,
  },
  title: {
    ...commonStyles.title,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 16,
    color: 'black',
  },
});
