import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configurar comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationToken {
  token: string;
  type: 'expo' | 'fcm';
}

export class NotificationsService {
  private static instance: NotificationsService;
  private token: string | null = null;

  private constructor() {}

  public static getInstance(): NotificationsService {
    if (!NotificationsService.instance) {
      NotificationsService.instance = new NotificationsService();
    }
    return NotificationsService.instance;
  }

  /**
   * Solicita permissões para notificações
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      return finalStatus === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
      return false;
    }
  }

  /**
   * Registra o token de notificação
   */
  async registerForPushNotifications(): Promise<NotificationToken | null> {
    try {
      if (!Device.isDevice) {
        console.log('Notificações push não funcionam em simulador');
        return null;
      }

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Permissão de notificação negada');
      }

      // Para desenvolvimento, usar token simulado
      console.log('🚀 Usando token simulado para desenvolvimento');
      this.token = `ExpoToken[development-${Date.now()}]`;
      
      // Configurar canal de notificação para Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF6B35',
        });
      }

      return {
        token: this.token,
        type: 'expo',
      };
    } catch (error) {
      console.error('Erro ao registrar token:', error);
      // Em caso de erro, retornar token simulado para desenvolvimento
      this.token = `ExpoToken[error-${Date.now()}]`;
      return {
        token: this.token,
        type: 'expo',
      };
    }
  }

  /**
   * Obtém o token atual
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Envia uma notificação de teste
   */
  async sendTestNotification(): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'FleetZone Mobile',
          body: 'Esta é uma notificação de teste do FleetZone!',
          data: { type: 'test' },
        },
        trigger: { seconds: 1 } as any,
      });
    } catch (error) {
      console.error('Erro ao enviar notificação de teste:', error);
      throw error;
    }
  }

  /**
   * Envia notificação personalizada
   */
  async sendNotification(title: string, body: string, data?: any): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
        },
        trigger: { seconds: 1 } as any,
      });
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      throw error;
    }
  }

  /**
   * Cancela todas as notificações agendadas
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Erro ao cancelar notificações:', error);
      throw error;
    }
  }

  /**
   * Obtém notificações recebidas
   */
  async getReceivedNotifications(): Promise<Notifications.Notification[]> {
    try {
      return await Notifications.getPresentedNotificationsAsync();
    } catch (error) {
      console.error('Erro ao obter notificações:', error);
      return [];
    }
  }

  /**
   * Adiciona listener para notificações recebidas
   */
  addNotificationReceivedListener(listener: (notification: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(listener);
  }

  /**
   * Adiciona listener para respostas de notificação
   */
  addNotificationResponseReceivedListener(listener: (response: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(listener);
  }

  /**
   * Remove listener
   */
  removeNotificationSubscription(subscription: Notifications.Subscription) {
    subscription.remove();
  }
}

// Exportar instância singleton
export const notificationsService = NotificationsService.getInstance();
