import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedText, ThemedView } from '../src/components';
import AppButton from '../src/components/AppButton';

export default function NotFoundScreen() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This screen doesn't exist.</ThemedText>
      <AppButton
        title="Ir para início"
        onPress={() => {
          // @ts-ignore - navigation types depend on router setup
          navigation.navigate('(tabs)');
        }}
        style={styles.link}
      />
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
