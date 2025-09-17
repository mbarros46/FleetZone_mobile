import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface ControlledInputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  label: string;
  error?: FieldError;
  rules?: object;
}

export function ControlledInput({
  name,
  control,
  label,
  error,
  rules,
  ...textInputProps
}: ControlledInputProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#999"
            {...textInputProps}
          />
        )}
      />
      {error && (
        <ThemedText style={styles.errorText}>{error.message}</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 5,
  },
});
