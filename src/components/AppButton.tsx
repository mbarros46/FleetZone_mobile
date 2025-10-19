import React from 'react';
import { TouchableOpacity, View, ActivityIndicator, TextStyle, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

interface Props {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
  color?: string;
}

export default function AppButton({ title, onPress, loading, icon, style, textStyle, disabled, variant = 'solid', color = '#0A7EA4' }: Props) {
  const isOutline = variant === 'outline';
  const containerStyle: StyleProp<ViewStyle> = [
    { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
    isOutline
      ? { backgroundColor: 'transparent', borderWidth: 2, borderColor: color }
      : { backgroundColor: color },
    style,
  ];

  const textColor = isOutline ? color : 'white';

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || !!loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && <Ionicons name={icon as any} size={18} color={textColor} style={{ marginRight: 8 }} />}
          <ThemedText style={[{ color: textColor, fontSize: 16, fontWeight: '600' }, textStyle]}>{title}</ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
}
