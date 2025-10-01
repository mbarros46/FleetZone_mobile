import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { notificationsService, NotificationToken } from '../services/notificationsService';

interface StoredNotification {
  id: string;
  title: string;
  body: string;
  data?: any;
  timestamp: number;
  read: boolean;
}

interface NotificationsContextData {
  notifications: StoredNotification[];
  hasUnreadNotifications: boolean;
  isRegistered: boolean;
  token: string | null;
  loading: boolean;
  initializeNotifications: () => Promise<void>;
  sendToServer: (token: string) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  getUnreadCount: () => number;
}

const NotificationsContext = createContext<NotificationsContextData>({} as NotificationsContextData);

interface NotificationsProviderProps {
  children: ReactNode;
}

const NOTIFICATIONS_STORAGE_KEY = '@FleetZone:notifications';
const TOKEN_STORAGE_KEY = '@FleetZone:push_token';

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<StoredNotification[]>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega notificações do AsyncStorage
  const loadStoredNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) {
        const parsedNotifications: StoredNotification[] = JSON.parse(stored);
        setNotifications(parsedNotifications);
        setHasUnreadNotifications(parsedNotifications.some(n => !n.read));
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    }
  };

  // Salva notificações no AsyncStorage
  const saveNotifications = async (newNotifications: StoredNotification[]) => {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(newNotifications));
      setNotifications(newNotifications);
      setHasUnreadNotifications(newNotifications.some(n => !n.read));
    } catch (error) {
      console.error('Erro ao salvar notificações:', error);
    }
  };

  // Adiciona nova notificação
  const addNotification = async (notification: Notifications.Notification) => {
    const newNotification: StoredNotification = {
      id: notification.request.identifier,
      title: notification.request.content.title || 'FleetZone',
      body: notification.request.content.body || '',
      data: notification.request.content.data,
      timestamp: Date.now(),
      read: false,
    };

    const updatedNotifications = [newNotification, ...notifications];
    await saveNotifications(updatedNotifications);
  };

  // Inicializa as notificações
  const initializeNotifications = async () => {
    setLoading(true);
    try {
      // Carrega notificações armazenadas
      await loadStoredNotifications();

      // Verifica se já tem token armazenado
      const savedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      if (savedToken) {
        setToken(savedToken);
        setIsRegistered(true);
      }

      // Registra para push notifications
      const tokenResult = await notificationsService.registerForPushNotifications();
      if (tokenResult) {
        setToken(tokenResult.token);
        setIsRegistered(true);
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, tokenResult.token);
        
        // Envia token para o servidor (mock endpoint)
        await sendToServer(tokenResult.token);
      }

      // Configura listeners
      const notificationListener = notificationsService.addNotificationReceivedListener(addNotification);
      const responseListener = notificationsService.addNotificationResponseReceivedListener((response) => {
        // Quando usuário toca na notificação, marca como lida
        markAsRead(response.notification.request.identifier);
      });

      return () => {
        notificationsService.removeNotificationSubscription(notificationListener);
        notificationsService.removeNotificationSubscription(responseListener);
      };
    } catch (error) {
      console.error('Erro ao inicializar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  // Envia token para o servidor (endpoint mock)
  const sendToServer = async (pushToken: string) => {
    try {
      // Aqui você integraria com seu backend real
      // Por enquanto, simularemos o envio
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceToken: pushToken,
          platform: 'expo',
          userId: 'mock-user-id', // Seria o ID real do usuário logado
        }),
      });

      if (response.ok) {
        console.log('Token enviado para o servidor com sucesso');
      } else {
        console.error('Erro ao enviar token para o servidor');
      }
    } catch (error) {
      console.error('Erro ao comunicar com o servidor:', error);
    }
  };

  // Marca notificação como lida
  const markAsRead = async (notificationId: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    await saveNotifications(updatedNotifications);
  };

  // Marca todas como lidas
  const markAllAsRead = async () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    await saveNotifications(updatedNotifications);
  };

  // Limpa todas as notificações
  const clearAllNotifications = async () => {
    try {
      await AsyncStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
      setNotifications([]);
      setHasUnreadNotifications(false);
    } catch (error) {
      console.error('Erro ao limpar notificações:', error);
    }
  };

  // Conta notificações não lidas
  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        hasUnreadNotifications,
        isRegistered,
        token,
        loading,
        initializeNotifications,
        sendToServer,
        markAsRead,
        markAllAsRead,
        clearAllNotifications,
        getUnreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): NotificationsContextData {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications deve ser usado dentro de NotificationsProvider');
  }
  return context;
}