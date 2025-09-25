import { zodResolver } from '@hookform/resolvers/zod';
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
import { useAccentColor } from '../../src/styles/theme';

const motoSchema = z.object({
  modelo: z
    .string()
    .min(1, 'Modelo é obrigatório')
    .min(3, 'Modelo deve ter pelo menos 3 caracteres')
    .max(50, 'Modelo deve ter no máximo 50 caracteres'),
  placa: z
    .string()
    .min(1, 'Placa é obrigatória')
    .regex(/^[A-Z]{3}-\d{4}$/, 'Placa deve seguir o formato ABC-1234')
    .toUpperCase(),
});

type MotoForm = z.infer<typeof motoSchema>;

export default function FormularioScreen() {
  const { accentColor } = useAccentColor();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MotoForm>({
    resolver: zodResolver(motoSchema),
    defaultValues: {
      modelo: '',
      placa: '',
    },
  });

  const onSubmit = async (data: MotoForm) => {
    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        'Moto Cadastrada!',
        `Modelo: ${data.modelo}\nPlaca: ${data.placa}`,
        [
          {
            text: 'OK',
            onPress: () => reset(), // Limpa o formulário após sucesso
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar a moto. Tente novamente.',
      );
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
            <Ionicons name="add-circle" size={32} color={accentColor} />
          </View>
          <ThemedText type="title" style={styles.title}>
            Cadastrar Nova Moto
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Preencha os dados abaixo para adicionar uma nova motocicleta à frota
          </ThemedText>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Ionicons name="document-text" size={20} color={accentColor} />
            <ThemedText style={styles.formTitle}>Informações da Moto</ThemedText>
          </View>

          <View style={styles.form}>
            <View style={styles.inputSection}>
              <View style={styles.inputHeader}>
                <Ionicons name="car-sport" size={16} color="#666" />
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

            <View style={styles.inputSection}>
              <View style={styles.inputHeader}>
                <Ionicons name="document" size={16} color="#666" />
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

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: accentColor },
                isSubmitting && styles.buttonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="white" size="small" />
                  <ThemedText style={styles.buttonText}>Salvando...</ThemedText>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Ionicons name="checkmark" size={20} color="white" />
                  <ThemedText style={styles.buttonText}>Cadastrar Moto</ThemedText>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                reset();
                Alert.alert('Formulário Limpo', 'Os campos foram limpos. Você pode preencher novamente.');
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={16} color="#666" />
              <ThemedText style={styles.clearButtonText}>Limpar Formulário</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Helper Text */}
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
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    gap: 20,
  },
  inputSection: {
    gap: 8,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
    gap: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  helperSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
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
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
