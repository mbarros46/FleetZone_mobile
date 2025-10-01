import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../src/contexts/auth';
import { useTranslation } from '../../src/hooks/useTranslation';
import { ThemedView } from '../../src/components/ThemedView';

export default function HomeScreen() {
  const { usuario, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              Bem-vindo, {usuario?.nome || 'Usuário'}!
            </Text>
            <Text style={styles.subtitle}>FleetZone - Gestão de Frota</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="bicycle" size={32} color="#007AFF" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Motos Cadastradas</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="location" size={32} color="#28a745" />
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Pátios Ativos</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={32} color="#17a2b8" />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Disponíveis</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="alert-circle" size={32} color="#ffc107" />
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Em Manutenção</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Nova Moto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="map" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Ver Pátios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bar-chart" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Relatórios</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#dc3545" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  actionsContainer: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  logoutText: {
    color: '#dc3545',
    fontSize: 16,
    marginLeft: 8,
  },
});