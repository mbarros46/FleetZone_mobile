import { StyleSheet } from 'react-native';
import { ThemedText, ThemedView } from '../../src/components';
import { useTranslation } from 'react-i18next';

export default function MotosScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <ThemedText>{t('motos.list_placeholder')}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
});
