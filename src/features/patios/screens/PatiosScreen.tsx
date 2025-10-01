import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  RefreshControl,
  Modal 
} from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import { useTranslation } from '../../../hooks/useTranslation';
import { Patio, patiosService } from '../../../services/patiosService';
import { useAuth } from '../../../contexts/auth';
import { PatioCard } from '../components/PatioCard';
import { PatioForm } from '../components/PatioForm';

export const PatiosScreen: React.FC = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [patios, setPatios] = useState<Patio[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatio, setSelectedPatio] = useState<Patio | undefined>(undefined);

  const loadPatios = useCallback(async () => {
    try {
      setLoading(true);
      const data = await patiosService.list(token || undefined);
      setPatios(data);
    } catch (error) {
      console.error('Erro ao carregar pátios:', error);
      Alert.alert(t('common.error'), t('patios.messages.loadError'));
    } finally {
      setLoading(false);
    }
  }, [token, t]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPatios();
    setRefreshing(false);
  }, [loadPatios]);

  useEffect(() => {
    loadPatios();
  }, [loadPatios]);

  const handleCreate = () => {
    setSelectedPatio(undefined);
    setModalVisible(true);
  };

  const handleEdit = (patio: Patio) => {
    setSelectedPatio(patio);
    setModalVisible(true);
  };

  const handleDelete = async (patio: Patio) => {
    try {
      await patiosService.remove(patio.id, token || undefined);
      Alert.alert(t('common.success'), t('patios.messages.deleteSuccess'));
      loadPatios();
    } catch (error) {
      console.error('Erro ao excluir pátio:', error);
      Alert.alert(t('common.error'), t('patios.messages.deleteError'));
    }
  };

  const handleSave = () => {
    setModalVisible(false);
    setSelectedPatio(undefined);
    loadPatios();
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedPatio(undefined);
  };

  const renderPatio = ({ item }: { item: Patio }) => (
    <PatioCard
      patio={item}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>
        {t('patios.messages.empty')}
      </ThemedText>
      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <ThemedText style={styles.createButtonText}>
          {t('patios.actions.create')}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  if (loading && patios.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemedText>{t('common.loading')}</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          {t('patios.title')}
        </ThemedText>
        <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
          <ThemedText style={styles.addButtonText}>+</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={patios}
        renderItem={renderPatio}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <PatioForm
          patio={selectedPatio}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});