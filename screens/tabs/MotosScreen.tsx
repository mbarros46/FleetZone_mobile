import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '../../src/components/ThemedView';

export default function MotosScreen() {
  const [motos] = useState([
    { id: '1', modelo: 'Honda CB 600F', placa: 'ABC-1234', status: 'disponivel' },
    { id: '2', modelo: 'Yamaha MT-03', placa: 'XYZ-5678', status: 'manutencao' },
    { id: '3', modelo: 'Kawasaki Ninja 400', placa: 'DEF-9012', status: 'disponivel' },
  ]);

  const handleAddMoto = () => {
    Alert.alert('Nova Moto', 'Funcionalidade de adicionar moto em desenvolvimento');
  };

  const renderMotoCard = (moto: any) => (
    <View key={moto.id} style={styles.motoCard}>
      <View style={styles.motoInfo}>
        <Text style={styles.motoModelo}>{moto.modelo}</Text>
        <Text style={styles.motoPlaca}>Placa: {moto.placa}</Text>
        <View style={[
          styles.statusBadge,
          moto.status === 'disponivel' ? styles.statusDisponivel : styles.statusManutencao
        ]}>
          <Text style={styles.statusText}>
            {moto.status === 'disponivel' ? 'Disponível' : 'Manutenção'}
          </Text>
        </View>
      </View>
      <View style={styles.motoActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Motos</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddMoto}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {motos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="bicycle-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>Nenhuma moto cadastrada</Text>
              <TouchableOpacity style={styles.emptyButton} onPress={handleAddMoto}>
                <Text style={styles.emptyButtonText}>Adicionar primeira moto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.motosContainer}>
              {motos.map(renderMotoCard)}
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
  motosContainer: {
    gap: 12,
  },
  motoCard: {
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
  motoInfo: {
    flex: 1,
  },
  motoModelo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  motoPlaca: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusDisponivel: {
    backgroundColor: '#d4edda',
  },
  statusManutencao: {
    backgroundColor: '#fff3cd',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  motoActions: {
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