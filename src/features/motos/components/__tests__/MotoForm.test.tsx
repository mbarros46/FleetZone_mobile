import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MotoForm } from '../MotoForm';

// Mock do contexto de tema
jest.mock('../../../styles/theme', () => ({
  useAccentColor: () => ({ accentColor: '#FF6B35' }),
}));

jest.mock('../../../hooks/useThemeColor', () => ({
  useThemeColor: () => '#ffffff',
}));

// Mock do componente ThemedText e ThemedView
jest.mock('../../../components', () => {
  const { Text, View, TextInput } = require('react-native');
  return {
    ThemedText: ({ children, ...props }: any) => <Text {...props}>{children}</Text>,
    ThemedView: ({ children, ...props }: any) => <View {...props}>{children}</View>,
    ControlledInput: ({ name, control, placeholder, ...props }: any) => (
      <TextInput
        {...props}
        placeholder={placeholder}
        testID={`input-${name}`}
      />
    ),
  };
});

import { Text, View, TextInput } from 'react-native';

describe('MotoForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should render form fields correctly', () => {
    const { getByTestId, getByText } = render(
      <MotoForm onSubmit={mockOnSubmit} />
    );

    expect(getByTestId('input-modelo')).toBeTruthy();
    expect(getByTestId('input-placa')).toBeTruthy();
    expect(getByText('Cadastrar Moto')).toBeTruthy();
  });

  it('should call onSubmit with correct data on successful submit', async () => {
    const { getByTestId, getByText } = render(
      <MotoForm onSubmit={mockOnSubmit} />
    );

    // Preencher os campos
    fireEvent.changeText(getByTestId('input-modelo'), 'Honda CG 160');
    fireEvent.changeText(getByTestId('input-placa'), 'ABC-1234');

    // Submeter o formulário
    fireEvent.press(getByText('Cadastrar Moto'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        modelo: 'Honda CG 160',
        placa: 'ABC-1234',
      });
    });
  });

  it('should show loading state when submitting', async () => {
    const { getByTestId, getByText } = render(
      <MotoForm onSubmit={mockOnSubmit} loading={true} />
    );

    expect(getByText('Salvando...')).toBeTruthy();
  });

  it('should clear form when clear button is pressed', async () => {
    const { getByTestId, getByText } = render(
      <MotoForm onSubmit={mockOnSubmit} />
    );

    // Preencher os campos
    fireEvent.changeText(getByTestId('input-modelo'), 'Honda CG 160');
    fireEvent.changeText(getByTestId('input-placa'), 'ABC-1234');

    // Pressionar o botão de limpar
    fireEvent.press(getByText('Limpar Formulário'));

    // Verificar se os campos foram limpos
    await waitFor(() => {
      expect(getByTestId('input-modelo')).toHaveProp('value', '');
      expect(getByTestId('input-placa')).toHaveProp('value', '');
    });
  });

  it('should handle submit error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    mockOnSubmit.mockRejectedValueOnce(new Error('Erro de rede'));

    const { getByTestId, getByText } = render(
      <MotoForm onSubmit={mockOnSubmit} />
    );

    // Preencher e submeter
    fireEvent.changeText(getByTestId('input-modelo'), 'Honda CG 160');
    fireEvent.changeText(getByTestId('input-placa'), 'ABC-1234');
    fireEvent.press(getByText('Cadastrar Moto'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
