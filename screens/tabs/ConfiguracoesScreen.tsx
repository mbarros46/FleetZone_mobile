import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../src/contexts/auth';
import { useThemeCustom } from '../../src/contexts/theme';
import { ThemedView } from '../../src/components/ThemedView';

export default function ConfiguracoesScreen() {
  const { usuario, logout } = useAuth();
  const { mode, setMode } = useThemeCustom();

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Erro no logout:', error);
            }
          },
        },
      ]
    );
  };

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidade em desenvolvimento');
  };

  const handleChangePassword = () => {
    Alert.alert('Alterar Senha', 'Funcionalidade em desenvolvimento');
  };

  const handleNotifications = () => {
    Alert.alert('Notificações', 'Funcionalidade em desenvolvimento');
  };

  const handleSupport = () => {
    Alert.alert('Suporte', 'Entre em contato pelo email: suporte@fleetzone.com');
  };

  const handleAbout = () => {
    Alert.alert('Sobre', 'FleetZone v1.0.0\nDesenvolvido para gestão de frota de motocicletas');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Configurações</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Seção do Usuário */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil</Text>
            
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={32} color="#007AFF" />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{usuario?.nome || 'Usuário'}</Text>
                <Text style={styles.userEmail}>{usuario?.email || 'email@example.com'}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
              <Ionicons name="create" size={20} color="#666" />
              <Text style={styles.settingText}>Editar Perfil</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
              <Ionicons name="lock-closed" size={20} color="#666" />
              <Text style={styles.settingText}>Alterar Senha</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          </View>

          {/* Seção de Preferências */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferências</Text>

            <View style={styles.settingItem}>
              <Ionicons name="moon" size={20} color="#666" />
              <Text style={styles.settingText}>Tema Escuro</Text>
              <Switch
                value={mode === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
                thumbColor="#fff"
              />
            </View>

            <TouchableOpacity style={styles.settingItem} onPress={handleNotifications}>
              <Ionicons name="notifications" size={20} color="#666" />
              <Text style={styles.settingText}>Notificações</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          </View>

          {/* Seção de Suporte */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suporte</Text>

            <TouchableOpacity style={styles.settingItem} onPress={handleSupport}>
              <Ionicons name="help-circle" size={20} color="#666" />
              <Text style={styles.settingText}>Ajuda e Suporte</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
              <Ionicons name="information-circle" size={20} color="#666" />
              <Text style={styles.settingText}>Sobre o App</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          </View>

          {/* Botão de Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#dc3545" />
            <Text style={styles.logoutText}>Sair da Conta</Text>
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
  header: {
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
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dc3545',
    marginTop: 16,
  },
  logoutText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});