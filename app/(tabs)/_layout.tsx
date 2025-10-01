// @ts-ignore - Tabs exists but TypeScript isn't recognizing it
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/ui/IconSymbol';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';

// Componentes de ícones extraídos
const HomeIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="house.fill" color={color} />
);

const MotosIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="list.bullet" color={color} />
);

const FormIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="plus.circle.fill" color={color} />
);

const ConfigIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="gear" color={color} />
);

const SobreIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="info.circle" color={color} />
);

const NotificationsIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="bell" color={color} />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="motos"
        options={{
          title: 'Motos',
          tabBarIcon: MotosIcon,
        }}
      />
      <Tabs.Screen
        name="formulario"
        options={{
          title: 'Cadastrar',
          tabBarIcon: FormIcon,
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Config',
          tabBarIcon: ConfigIcon,
        }}
      />
      <Tabs.Screen
        name="notificacoes"
        options={{
          title: 'Notificações',
          tabBarIcon: NotificationsIcon,
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: SobreIcon,
        }}
      />
    </Tabs>
  );
}
