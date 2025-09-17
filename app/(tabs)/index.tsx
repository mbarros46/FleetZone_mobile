import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';

export default function HomeScreen() {
  const { accentColor } = useAccentColor();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Bem-vindo ao FleetZone
      </ThemedText>

      <ThemedView style={styles.buttonContainer}>
        <Link href="/(tabs)/motos" asChild>
          <ThemedView style={[styles.button, { backgroundColor: accentColor }]}>
            <ThemedText style={styles.buttonText}>Ver Motos</ThemedText>
          </ThemedView>
        </Link>

        <Link href="/(tabs)/formulario" asChild>
          <ThemedView style={[styles.button, { backgroundColor: accentColor }]}>
            <ThemedText style={styles.buttonText}>Cadastrar Moto</ThemedText>
          </ThemedView>
        </Link>

        <Link href="/(tabs)/configuracoes" asChild>
          <ThemedView style={[styles.button, { backgroundColor: accentColor }]}>
            <ThemedText style={styles.buttonText}>Configurações</ThemedText>
          </ThemedView>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
