import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ControlledInput } from '@/components/ControlledInput';
import { useThemeCustom } from '../../src/contexts/theme';
import { useAccentColor } from '../../src/styles/theme';

const configSchema = z.object({
  corDestaque: z.string()
    .min(1, 'Cor de destaque é obrigatória')
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve estar no formato hexadecimal (#RRGGBB)')
    .toUpperCase(),
});

type ConfigForm = z.infer<typeof configSchema>;

export default function ConfiguracoesScreen() {
  const { mode, setMode } = useThemeCustom();
  const { accentColor, saveAccentColor } = useAccentColor();
  
  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ConfigForm>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      corDestaque: '',
    },
  });

  useEffect(() => {
    setValue('corDestaque', accentColor);
  }, [accentColor, setValue]);

  const onSubmit = async (data: ConfigForm) => {
    try {
      await saveAccentColor(data.corDestaque);
      Alert.alert('Sucesso', 'Configurações salvas!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Configurações</ThemedText>

      <ThemedView style={styles.form}>
        <ControlledInput
          name="corDestaque"
          control={control}
          label="Cor de Destaque:"
          placeholder="Digite a cor (#FF0000)"
          error={errors.corDestaque}
          autoCapitalize="characters"
          maxLength={7}
        />

        <ThemedView style={styles.themeContainer}>
          <ThemedText style={styles.label}>Tema:</ThemedText>
          
          <TouchableOpacity 
            style={[styles.themeOption, mode === 'light' && styles.themeOptionSelected]}
            onPress={() => setMode('light')}
          >
            <ThemedText style={styles.themeOptionText}>☀️ Claro</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.themeOption, mode === 'dark' && styles.themeOptionSelected]}
            onPress={() => setMode('dark')}
          >
            <ThemedText style={styles.themeOptionText}>🌙 Escuro</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.themeOption, mode === 'system' && styles.themeOptionSelected]}
            onPress={() => setMode('system')}
          >
            <ThemedText style={styles.themeOptionText}>📱 Sistema</ThemedText>
          </TouchableOpacity>
        </ThemedView>

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
  container: { flex: 1, padding: 20 },
  title: { marginBottom: 30, textAlign: 'center' },
  form: { gap: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  themeContainer: {
    gap: 10,
  },
  themeOption: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionSelected: {
    borderColor: '#0a7ea4',
    backgroundColor: '#e6f3f7',
  },
  themeOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
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
