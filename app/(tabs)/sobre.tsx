import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../src/locales';

export default function AboutScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t('about.title')}</Text>
        <Text style={styles.text}>{t('about.description')}</Text>
        <Text style={styles.text}>
          🚀 O FleetZone foi desenvolvido para simplificar o gerenciamento de frotas da Mottu,
          com foco em eficiência, usabilidade e integração com dispositivos IoT.
        </Text>
        <Text style={styles.text}>
          📱 Desenvolvido em React Native com Expo e integração completa com APIs RESTful.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#fff' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
});
