import { StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ControlledInput } from '@/components/ControlledInput';
import { useAccentColor } from '../../src/styles/theme';

const motoSchema = z.object({
  modelo: z.string()
    .min(1, 'Modelo é obrigatório')
    .min(3, 'Modelo deve ter pelo menos 3 caracteres')
    .max(50, 'Modelo deve ter no máximo 50 caracteres'),
  placa: z.string()
    .min(1, 'Placa é obrigatória')
    .regex(/^[A-Z]{3}-\d{4}$/, 'Placa deve seguir o formato ABC-1234')
    .toUpperCase(),
});

type MotoForm = z.infer<typeof motoSchema>;

export default function FormularioScreen() {
  const { accentColor } = useAccentColor();
  
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<MotoForm>({
    resolver: zodResolver(motoSchema),
    defaultValues: {
      modelo: '',
      placa: '',
    },
  });

  const onSubmit = async (data: MotoForm) => {
    try {
      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Moto Cadastrada!',
        `Modelo: ${data.modelo}\nPlaca: ${data.placa}`,
        [
          { 
            text: 'OK', 
            onPress: () => reset() // Limpa o formulário após sucesso
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar a moto. Tente novamente.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Cadastrar Nova Moto</ThemedText>
      
      <ThemedView style={styles.form}>
        <ControlledInput
          name="modelo"
          control={control}
          label="Modelo da Moto:"
          placeholder="Digite o modelo (ex: Honda CG 160)"
          error={errors.modelo}
          autoCapitalize="words"
        />

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
            isSubmitting && styles.buttonDisabled
          ]} 
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <ThemedText style={styles.buttonText}>Salvar</ThemedText>
          )}
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 