import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';
import { useForm, type SubmitHandler, type Resolver } from 'react-hook-form';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';

import { ControlledInput, ThemedText, ThemedView } from '../../src/components';
import AppButton from '../../src/components/AppButton';
import Stack from '../../src/components/Stack';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { motosService } from '../../src/services/motosService';
import { useAuth } from '../../src/contexts/auth';

const motoSchema = z.object({
  modelo: z
    .string()
    .min(1, 'Modelo é obrigatório')
    .min(3, 'Modelo deve ter pelo menos 3 caracteres')
    .max(50, 'Modelo deve ter no máximo 50 caracteres'),
  placa: z
    .string()
    .min(1, 'Placa é obrigatória')
    .regex(/^[A-Z]{3}-\d{4}$/i, 'Placa deve seguir o formato ABC-1234')
    .transform((s) => s.toUpperCase()),
  status: z
    .string()
    .max(50, 'Status deve ter no máximo 50 caracteres')
    .optional()
    .transform((value) => (value?.trim() ? value.trim() : undefined)),
});

type MotoForm = z.infer<typeof motoSchema>;
type FormularioRouteParams = { id?: string } | undefined;

export default function FormularioScreen() {
  const { accentColor } = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const { token } = useAuth();

  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, FormularioRouteParams>, string>>();
  const params = (route.params as FormularioRouteParams) ?? {};
  const editingId =
    typeof params?.id === 'string' && /^\d+$/.test(params.id) ? Number(params.id) : undefined;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MotoForm>({
    resolver: zodResolver(motoSchema) as Resolver<MotoForm>,
    defaultValues: {
      modelo: '',
      placa: '',
      status: undefined,
    },
  });

  const [loadingMoto, setLoadingMoto] = useState<boolean>(!!editingId);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!editingId) return;

    let isMounted = true;
    const loadMoto = async () => {
      try {
        setLoadingMoto(true);
        const moto = await motosService.get(editingId, token ?? undefined);
        if (!isMounted) return;
        reset({
          modelo: moto.modelo ?? '',
          placa: moto.placa ?? '',
          status: moto.status ?? undefined,
        });
      } catch (e: any) {
        Alert.alert('Erro', e?.message ?? 'Falha ao carregar moto');
      } finally {
        if (isMounted) setLoadingMoto(false);
      }
    };

    loadMoto();
    return () => {
      isMounted = false;
    };
  }, [editingId, reset, token]);

  const onSubmit: SubmitHandler<MotoForm> = async (values) => {
    const payload = {
      modelo: values.modelo,
      placa: values.placa,
      status: values.status,
    };

    try {
      setSaving(true);
      if (editingId) {
        await motosService.update(editingId, payload, token ?? undefined);
      } else {
        await motosService.create(payload, token ?? undefined);
      }

      Alert.alert('Sucesso', 'Dados salvos!', [
        {
          text: 'OK',
          onPress: () => {
            if (editingId) {
              navigation.goBack();
            } else {
              reset({ modelo: '', placa: '', status: undefined });
            }
          },
        },
      ]);
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Falha ao salvar');
    } finally {
      setSaving(false);
    }
  };

  if (loadingMoto) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <ThemedText style={{ marginTop: 8 }}>Carregando dados da moto…</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
            <Ionicons name={editingId ? 'create' : 'add-circle'} size={32} color={accentColor} />
          </View>
          <ThemedText type="title" style={styles.title}>
            {editingId ? 'Editar Moto' : 'Cadastrar Nova Moto'}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Preencha os dados abaixo para {editingId ? 'atualizar' : 'adicionar'} a motocicleta na frota
          </ThemedText>
        </View>

        <ThemedView style={[styles.formCard, { backgroundColor: cardColor, borderColor: borderColor }]}>
          <View style={styles.formHeader}>
            <Ionicons name="document-text" size={20} color={accentColor} />
            <ThemedText style={styles.formTitle}>Informações da Moto</ThemedText>
          </View>

          <Stack spacing={20} style={styles.form}>
            <View>
              <View style={styles.inputHeader}>
                <Ionicons name="car-sport" size={16} color="#666" style={{ marginRight: 8 }} />
                <ThemedText style={styles.inputLabel}>Modelo</ThemedText>
              </View>
              <ControlledInput
                name="modelo"
                control={control}
                label=""
                placeholder="Ex: Honda CG 160, Yamaha Fazer 250"
                error={errors.modelo}
                autoCapitalize="words"
                style={styles.input}
              />
            </View>

            <View>
              <View style={styles.inputHeader}>
                <Ionicons name="document" size={16} color="#666" style={{ marginRight: 8 }} />
                <ThemedText style={styles.inputLabel}>Placa</ThemedText>
              </View>
              <ControlledInput
                name="placa"
                control={control}
                label=""
                placeholder="ABC-1234"
                error={errors.placa}
                autoCapitalize="characters"
                maxLength={8}
                style={styles.input}
              />
            </View>

            <View>
              <View style={styles.inputHeader}>
                <Ionicons name="bar-chart" size={16} color="#666" style={{ marginRight: 8 }} />
                <ThemedText style={styles.inputLabel}>Status (opcional)</ThemedText>
              </View>
              <ControlledInput
                name="status"
                control={control}
                label=""
                placeholder="Disponível, Em manutenção..."
                error={errors.status}
                autoCapitalize="sentences"
                style={styles.input}
              />
            </View>
          </Stack>

            <AppButton
              title={editingId ? 'Atualizar Moto' : 'Cadastrar Moto'}
              icon="checkmark"
              loading={saving}
              onPress={handleSubmit(onSubmit) as any}
              style={[styles.submitButton, { backgroundColor: accentColor }]}
              disabled={saving}
            />

            <AppButton
              title="Limpar Formulário"
              icon="refresh"
              variant="outline"
              color="#666"
              onPress={() => {
                reset({ modelo: '', placa: '', status: undefined });
                Alert.alert('Formulário Limpo', 'Os campos foram limpos. Você pode preencher novamente.');
              }}
              style={styles.clearButton}
            />
        </ThemedView>

        <View style={styles.helperSection}>
          <Ionicons name="information-circle" size={16} color="#999" />
          <ThemedText style={styles.helperText}>
            Certifique-se de que a placa está no formato correto (ABC-1234)
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
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
    paddingBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.7,
  },
  formCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    // use marginRight on icon/text instead of gap
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    // spacing handled by Stack wrapper in markup
  },
  inputSection: {
    // use margins between inputs instead of gap
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // use marginRight on icon instead of gap
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  submitButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // use margin on icon/text instead of gap
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // spacing using margin between spinner and text
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  helperSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // use margin between icon and text
    paddingHorizontal: 4,
    marginBottom: 32,
  },
  helperText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    flex: 1,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginTop: 12,
    // use margin on child elements instead of gap
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
