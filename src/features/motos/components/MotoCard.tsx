import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '../../../components';
import { useAccentColor } from '../../../styles/theme';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { MotoDTO } from '../../../services/motosService';

interface MotoCardProps {
  moto: MotoDTO;
  onDelete: (id?: number) => void;
}

export function MotoCard({ moto, onDelete }: MotoCardProps) {
  const { accentColor } = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');

  const getStatusIcon = (status: string) => {
    if (status === 'Disponível') return 'checkmark-circle';
    if (status === 'Em manutenção') return 'construct';
    return 'close-circle';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Disponível') return '#4CAF50';
    if (status === 'Em manutenção') return '#FF9800';
    return '#F44336';
  };

  const handlePress = () => {
    Alert.alert(
      `🏍️ ${moto.modelo}`,
      `📋 Placa: ${moto.placa}\n🔧 Status: ${moto.status || 'N/A'}\n\n💡 Dica: Use a aba "Detalhes" para buscar informações completas por placa!`,
      [
        { text: 'Ver Detalhes', onPress: () => Alert.alert('Navegação', 'Vá para a aba "Detalhes" e digite a placa para ver informações completas.') },
        { text: 'Fechar', style: 'cancel' }
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[styles.motoCard, { backgroundColor: cardColor, borderColor: borderColor }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.motoIcon}>
          <Ionicons name="bicycle" size={24} color={accentColor} />
        </View>
        <View style={styles.statusBadge}>
          <Ionicons 
            name={getStatusIcon(moto.status || '')} 
            size={16} 
            color={getStatusColor(moto.status || '')}
          />
          <ThemedText style={[styles.statusText, { color: getStatusColor(moto.status || '') }]}>
            {moto.status || 'N/A'}
          </ThemedText>
        </View>
      </View>
      
      <View style={styles.motoInfo}>
        <ThemedText style={styles.motoModel}>
          {moto.modelo}
        </ThemedText>
        <View style={styles.placaContainer}>
          <Ionicons name="document-text" size={16} color={useThemeColor({}, 'icon')} />
          <ThemedText style={styles.placaText}>
            {moto.placa}
          </ThemedText>
        </View>
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => onDelete(moto.id)}>
          <Ionicons name="trash-outline" size={22} color={textColor} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  motoCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  motoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    opacity: 0.9,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  motoInfo: {
    marginBottom: 12,
  },
  motoModel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  placaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  placaText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'monospace',
  },
  cardActions: {
    alignItems: 'flex-end',
  },
});
