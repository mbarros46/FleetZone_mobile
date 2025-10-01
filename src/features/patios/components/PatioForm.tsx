import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import { useTranslation } from '../../../hooks/useTranslation';
import { Patio, patiosService } from '../../../services/patiosService';
import { useAuth } from '../../../contexts/auth';

interface PatioFormProps {
  patio?: Patio;
  onSave?: (patio: Patio) => void;
  onCancel?: () => void;
}

export const PatioForm: React.FC<PatioFormProps> = ({
  patio,
  onSave,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: patio?.nome || '',
    localizacao: patio?.localizacao || '',
  });

  const isEditing = !!patio;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nome.trim()) {
      Alert.alert(t('common.error'), t('patios.validation.nomeRequired'));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      let savedPatio: Patio;

      if (isEditing && patio) {
        savedPatio = await patiosService.update(patio.id, formData, token || undefined);
      } else {
        savedPatio = await patiosService.create(formData, token || undefined);
      }

      Alert.alert(
        t('common.success'),
        isEditing ? t('patios.messages.updateSuccess') : t('patios.messages.createSuccess'),
        [
          {
            text: t('common.confirm'),
            onPress: () => onSave?.(savedPatio),
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao salvar pátio:', error);
      Alert.alert(
        t('common.error'),
        isEditing ? t('patios.messages.updateError') : t('patios.messages.createError')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">
            {isEditing ? t('patios.form.editTitle') : t('patios.form.createTitle')}
          </ThemedText>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>
              {t('patios.fields.nome')} *
            </ThemedText>
            <TextInput
              style={styles.input}
              value={formData.nome}
              onChangeText={(value) => handleInputChange('nome', value)}
              placeholder={t('patios.placeholders.nome')}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>
              {t('patios.fields.localizacao')}
            </ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.localizacao}
              onChangeText={(value) => handleInputChange('localizacao', value)}
              placeholder={t('patios.placeholders.localizacao')}
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            disabled={loading}
          >
            <ThemedText style={[styles.buttonText, styles.cancelText]}>
              {t('common.cancel')}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
            disabled={loading}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? t('common.loading') : t('common.save')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  form: {
    gap: 16,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8E8E93',
  },
  buttonText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelText: {
    color: '#8E8E93',
  },
});