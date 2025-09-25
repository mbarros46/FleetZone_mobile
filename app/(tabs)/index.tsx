import { StyleSheet, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ThemedText, ThemedView } from '../../src/components';
import { useAccentColor } from '../../src/styles/theme';

export default function HomeScreen() {
  const { accentColor } = useAccentColor();
  const navigation = useNavigation();
  
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[accentColor, `${accentColor}88`]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="bicycle" size={60} color="white" />
          <ThemedText type="title" style={styles.title}>
            FleetZone
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Gerencie sua frota de motocicletas
          </ThemedText>
        </View>
      </LinearGradient>

      <ThemedView style={styles.container}>
        <ThemedView style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="speedometer" size={24} color={accentColor} />
            <ThemedText style={styles.statNumber}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Motos Ativas</ThemedText>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <ThemedText style={styles.statNumber}>8</ThemedText>
            <ThemedText style={styles.statLabel}>Disponíveis</ThemedText>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="build" size={24} color="#FF9800" />
            <ThemedText style={styles.statNumber}>4</ThemedText>
            <ThemedText style={styles.statLabel}>Manutenção</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: accentColor }]}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('motos');
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="list" size={20} color="white" style={styles.buttonIcon} />
            <ThemedText style={styles.primaryButtonText}>Ver Motos</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('formulario');
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle" size={20} color={accentColor} style={styles.buttonIcon} />
            <ThemedText style={[styles.secondaryButtonText, { color: accentColor }]}>
              Cadastrar Moto
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('configuracoes');
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="settings" size={20} color={accentColor} style={styles.buttonIcon} />
            <ThemedText style={[styles.secondaryButtonText, { color: accentColor }]}>
              Configurações
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(10, 126, 164, 0.2)',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonIcon: {
    marginRight: 8,
  },
});
