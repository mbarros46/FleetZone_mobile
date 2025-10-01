import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '../../src/components/ThemedView';
import { patiosService, Patio } from '../../src/services/patiosService';
import { useAuth } from '../../src/contexts/auth';

export default function PatiosScreen() {
  const [patios, setPatios] = useState<Patio[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    carregarPatios();
  }, []);

  const carregarPatios = async () => {
    try {
      setLoading(true);
      const patiosData = await patiosService.list(token || undefined);
      setPatios(patiosData);
    } catch (error) {
      console.error('Erro ao carregar pátios:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pátios');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarPatios();
    setRefreshing(false);
  };

  const handleAddPatio = () => {
    Alert.alert('Novo Pátio', 'Funcionalidade de adicionar pátio em desenvolvimento');
  };

  const handleEditPatio = (patio: Patio) => {
    Alert.alert('Editar Pátio', `Funcionalidade de editar ${patio.nome} em desenvolvimento`);
  };

  const handleDeletePatio = async (patio: Patio) => {
    Alert.alert(
      'Excluir Pátio',
      `Tem certeza que deseja excluir ${patio.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await patiosService.remove(patio.id, token || undefined);
              await carregarPatios();
              Alert.alert('Sucesso', 'Pátio excluído com sucesso');
            } catch (error) {
              console.error('Erro ao excluir pátio:', error);
              Alert.alert('Erro', 'Não foi possível excluir o pátio');
            }
          },
        },
      ]
    );
  };

  const renderPatioCard = (patio: Patio) => {
    return (
      <View key={patio.id} style={styles.patioCard}>
        <View style={styles.patioInfo}>
          <Text style={styles.patioNome}>{patio.nome}</Text>
          <Text style={styles.patioEndereco}>{patio.localizacao || 'Localização não informada'}</Text>
        </View>
        <View style={styles.patioActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditPatio(patio)}
          >
            <Ionicons name="create" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeletePatio(patio)}
          >
            <Ionicons name="trash" size={20} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.container}>
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.emptyText}>Carregando pátios...</Text>
          </View>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pátios</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPatio}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {patios.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="location-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>Nenhum pátio cadastrado</Text>
              <TouchableOpacity style={styles.emptyButton} onPress={handleAddPatio}>
                <Text style={styles.emptyButtonText}>Adicionar primeiro pátio</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.patiosContainer}>
              {patios.map(renderPatioCard)}
            </View>
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  patiosContainer: {
    gap: 12,
  },
  patioCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  patioInfo: {
    flex: 1,
  },
  patioNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  patioEndereco: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ocupacaoContainer: {
    marginTop: 8,
  },
  ocupacaoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLow: {
    backgroundColor: '#28a745',
  },
  progressMedium: {
    backgroundColor: '#ffc107',
  },
  progressHigh: {
    backgroundColor: '#dc3545',
  },
  patioActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});