import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Bem-vindo ao FleetZone</ThemedText>
      
      <ThemedView style={styles.buttonContainer}>
        <Link href="/(tabs)/motos" asChild>
          <ThemedView style={styles.button}>
            <ThemedText style={styles.buttonText}>Ver Motos</ThemedText>
          </ThemedView>
        </Link>

        <Link href="/(tabs)/formulario" asChild>
          <ThemedView style={styles.button}>
            <ThemedText style={styles.buttonText}>Cadastrar Moto</ThemedText>
          </ThemedView>
        </Link>

        <Link href="/(tabs)/configuracoes" asChild>
          <ThemedView style={styles.button}>
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
    backgroundColor: '#0a7ea4',
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
