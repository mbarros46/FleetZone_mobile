import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import { useTranslation } from '../../../hooks/useTranslation';
import { Patio } from '../../../services/patiosService';

interface PatioCardProps {
  patio: Patio;
  onEdit?: (patio: Patio) => void;
  onDelete?: (patio: Patio) => void;
  onPress?: (patio: Patio) => void;
}

export const PatioCard: React.FC<PatioCardProps> = ({
  patio,
  onEdit,
  onDelete,
  onPress,
}) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    Alert.alert(
      t('patios.confirmDelete.title'),
      t('patios.confirmDelete.message', { name: patio.nome }),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => onDelete?.(patio),
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => onPress?.(patio)}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.nome}>
            {patio.nome}
          </ThemedText>
          <ThemedText type="caption" style={styles.id}>
            ID: {patio.id}
          </ThemedText>
        </View>

        {patio.localizacao && (
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {t('patios.fields.localizacao')}:
            </ThemedText>
            <ThemedText style={styles.value}>
              {patio.localizacao}
            </ThemedText>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit?.(patio)}
          >
            <ThemedText style={styles.actionText}>
              {t('common.edit')}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <ThemedText style={[styles.actionText, styles.deleteText]}>
              {t('common.delete')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nome: {
    flex: 1,
    fontWeight: '600',
  },
  id: {
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '500',
    marginRight: 8,
    minWidth: 80,
  },
  value: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  actionText: {
    fontWeight: '500',
    color: '#FFFFFF',
  },
  deleteText: {
    color: '#FF3B30',
  },
});