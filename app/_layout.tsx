import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
// evitar import direto (problemas de tipagem em algumas versões)
const { Stack } = require('expo-router');
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';

import { ThemeProviderCustom, useThemeCustom, AuthProvider, LanguageProvider } from '../src/contexts';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppNav() {
  const { navTheme } = useThemeCustom();
  useEffect(() => {
    // configure notification handling while app is foreground
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: false,
      }),
    });

    const receivedListener = Notifications.addNotificationReceivedListener(notification => {
      // podemos processar dados quando a notificação é recebida em foreground
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      // resposta do usuário (tap) na notificação
      // aqui podemos processar response.notification.request.content.data se necessário
    });

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, []);
  return (
    <ThemeProvider value={navTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProviderCustom>
      <AuthProvider>
        <LanguageProvider>
          <AppNav />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProviderCustom>
  );
}
