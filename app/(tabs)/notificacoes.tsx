import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useNotifications } from '../../src/contexts/notifications';
import { notificationsService } from '../../src/services/notificationsService';

export default function NotificacoesScreen() {
  const { accentColor } = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const { t } = useTranslation();
  const {
    notifications,
    hasUnreadNotifications,
    isRegistered,
    token,
    loading,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    getUnreadCount,
  } = useNotifications();

  const [testTitle, setTestTitle] = useState('FleetZone Mobile');
  const [testBody, setTestBody] = useState('Esta é uma notificação de teste!');

  const handleTestNotification = async () => {
    try {
      await notificationsService.sendNotification(testTitle, testBody);
      Alert.alert(t('notifications.testSuccess'));
    } catch (error: any) {
      Alert.alert(t('notifications.testError'), error.message);
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Limpar Notificações',
      'Tem certeza de que deseja limpar todas as notificações?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpar', 
          style: 'destructive',
          onPress: clearAllNotifications
        },
      ]
    );
  };

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { backgroundColor: cardColor, borderColor },
        !item.read && { backgroundColor: `${accentColor}10` }
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationHeader}>
        <ThemedText style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.notificationTime}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </ThemedText>
      </View>
      <ThemedText style={styles.notificationBody}>{item.body}</ThemedText>
      {!item.read && (
        <View style={[styles.unreadIndicator, { backgroundColor: accentColor }]} />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={accentColor} />
          <ThemedText>{t('common.loading')}</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>{t('notifications.title')}</ThemedText>
          <ThemedText style={styles.subtitle}>
            {t('notifications.subtitle')}
          </ThemedText>
        </View>

        {/* Status */}
        <View style={[styles.statusCard, { backgroundColor: cardColor, borderColor }]}>
          <View style={styles.statusRow}>
            <Ionicons
              name={isRegistered ? 'checkmark-circle' : 'alert-circle'}
              size={20}
              color={isRegistered ? '#34C759' : '#FF9500'}
            />
            <ThemedText style={styles.statusText}>
              {isRegistered ? 'Notificações Ativadas' : 'Notificações Desativadas'}
            </ThemedText>
          </View>
          
          {token && (
            <View style={styles.tokenContainer}>
              <ThemedText style={styles.tokenLabel}>{t('notifications.token')}:</ThemedText>
              <ThemedText style={styles.tokenText} numberOfLines={1}>
                {`${token.substring(0, 20)}...`}
              </ThemedText>
            </View>
          )}
        </View>

        {/* Test Notifications */}
        <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="flask" size={20} color={accentColor} />
            <ThemedText style={styles.cardTitle}>Testar Notificações</ThemedText>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Título:</ThemedText>
            <TextInput
              style={[styles.input, { borderColor, color: useThemeColor({}, 'text') }]}
              value={testTitle}
              onChangeText={setTestTitle}
              placeholder="Digite o título"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Mensagem:</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea, { borderColor, color: useThemeColor({}, 'text') }]}
              value={testBody}
              onChangeText={setTestBody}
              placeholder="Digite a mensagem"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={[styles.testButton, { backgroundColor: accentColor }]}
            onPress={handleTestNotification}
          >
            <Ionicons name="send" size={16} color="#FFFFFF" />
            <ThemedText style={styles.testButtonText}>
              {t('notifications.testNotification')}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
          <View style={styles.listHeader}>
            <View style={styles.cardHeader}>
              <Ionicons name="list" size={20} color={accentColor} />
              <ThemedText style={styles.cardTitle}>
                Notificações Recebidas ({notifications.length})
              </ThemedText>
            </View>
            
            {notifications.length > 0 && (
              <View style={styles.listActions}>
                {hasUnreadNotifications && (
                  <TouchableOpacity
                    style={[styles.actionButton, { borderColor: accentColor }]}
                    onPress={markAllAsRead}
                  >
                    <ThemedText style={[styles.actionButtonText, { color: accentColor }]}>
                      Marcar Todas como Lidas
                    </ThemedText>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={handleClearAll}
                >
                  <ThemedText style={[styles.actionButtonText, styles.deleteButtonText]}>
                    Limpar Todas
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off" size={40} color="#999" />
              <ThemedText style={styles.emptyText}>
                Nenhuma notificação recebida ainda
              </ThemedText>
              <ThemedText style={styles.emptySubtext}>
                As notificações aparecerão aqui quando chegarem
              </ThemedText>
            </View>
          ) : (
            <FlatList
              data={notifications}
              renderItem={renderNotification}
              keyExtractor={(item) => item.id}
              style={styles.notificationsList}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  statusCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  tokenContainer: {
    marginTop: 8,
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  tokenText: {
    fontSize: 12,
    opacity: 0.7,
    fontFamily: 'monospace',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listHeader: {
    marginBottom: 16,
  },
  listActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    borderColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#FF3B30',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  notificationsList: {
    maxHeight: 400,
  },
  notificationItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    position: 'relative',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
    opacity: 0.7,
  },
  notificationBody: {
    fontSize: 14,
    opacity: 0.8,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});