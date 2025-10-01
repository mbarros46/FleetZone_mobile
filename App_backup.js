import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ThemeProviderCustom, useThemeCustom } from './src/contexts/theme';
import { AuthProvider, useAuth } from './src/contexts/auth';
import { NotificationsProvider } from './src/contexts/notifications';

// Import screens
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import HomeScreen from './screens/tabs/HomeScreen';
import MotosScreen from './screens/tabs/MotosScreen';
import PatiosScreen from './screens/tabs/PatiosScreen';
import ConfiguracoesScreen from './screens/tabs/ConfiguracoesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function TabNavigator() {
  const { navTheme } = useThemeCustom();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Motos') {
            iconName = focused ? 'bicycle' : 'bicycle-outline';
          } else if (route.name === 'Patios') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Configuracoes') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#333',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Início', headerShown: false }}
      />
      <Tab.Screen 
        name="Motos" 
        component={MotosScreen}
        options={{ title: 'Motos', headerShown: false }}
      />
      <Tab.Screen 
        name="Patios" 
        component={PatiosScreen}
        options={{ title: 'Pátios', headerShown: false }}
      />
      <Tab.Screen 
        name="Configuracoes" 
        component={ConfiguracoesScreen}
        options={{ title: 'Configurações', headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { usuario, loading } = useAuth();

  console.log('AppNavigator render - loading:', loading, 'usuario:', usuario ? 'authenticated' : 'not authenticated');

  if (loading) {
    console.log('Auth loading, showing loading screen');
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#333' }}>Carregando autenticação...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        console.log('🚀 Iniciando carregamento do app...');
        
        // Aguarda as fontes carregarem
        if (loaded) {
          console.log('✅ Fontes carregadas com sucesso');
          // Pequeno delay para garantir que tudo está pronto
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (e) {
        console.warn('⚠️ Erro durante carregamento:', e);
      } finally {
        if (loaded) {
          console.log('🎯 App pronto para ser exibido');
          setReady(true);
        }
      }
    }

    prepare();
  }, [loaded]);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      console.log('🔄 Ocultando splash screen...');
      await SplashScreen.hideAsync();
      console.log('✨ Splash screen ocultado com sucesso');
    }
  }, [ready]);

  // Mostra loading enquanto não está pronto
  if (!ready) {
    return null; // SplashScreen nativo será exibido
  }

  console.log('🎯 Renderizando app completo');

  try {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <ThemeProviderCustom>
          <AuthProvider>
            <NotificationsProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
              <StatusBar style="auto" />
            </NotificationsProvider>
          </AuthProvider>
        </ThemeProviderCustom>
      </View>
    );
  } catch (error) {
    console.error('❌ Erro crítico ao renderizar app:', error);
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>Erro ao carregar o app</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>{error.toString()}</Text>
      </View>
    );
  }
}