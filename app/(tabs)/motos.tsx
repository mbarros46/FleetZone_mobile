import { StyleSheet } from 'react-native';
import { ThemedText, ThemedView } from '../../src/components';

export default function MotosScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Lista de motos (temporário)</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
});
