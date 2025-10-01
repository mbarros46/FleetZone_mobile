
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService, register as registerService } from '../services/authService';

interface Usuario {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextData {
  token: string | null;
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    loadStoragedData();
  }, []);

  async function loadStoragedData() {
    try {
      const storagedToken = await AsyncStorage.getItem('@FleetZone:token');
      const storagedUser = await AsyncStorage.getItem('@FleetZone:user');

      if (storagedToken && storagedUser) {
        setToken(storagedToken);
        setUsuario(JSON.parse(storagedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do storage:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, senha: string) {
    try {
      setLoading(true);
      
      // Validações básicas
      if (!email || !senha) {
        throw new Error('Email e senha são obrigatórios');
      }
      
      if (!email.includes('@')) {
        throw new Error('Email deve ter um formato válido');
      }
      
      if (senha.length < 3) {
        throw new Error('Senha deve ter pelo menos 3 caracteres');
      }

      console.log('🔐 Tentando fazer login...');
      const response = await loginService(email, senha);
      
      const { token: authToken, usuario: authUsuario } = response;

      if (!authToken || !authUsuario) {
        throw new Error('Resposta do servidor inválida');
      }

      await AsyncStorage.setItem('@FleetZone:token', authToken);
      await AsyncStorage.setItem('@FleetZone:user', JSON.stringify(authUsuario));

      setToken(authToken);
      setUsuario(authUsuario);
      
      console.log('✅ Login realizado com sucesso:', authUsuario.nome);
    } catch (error: any) {
      console.error('❌ Erro no login:', error);
      
      // Melhores mensagens de erro para o usuário
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        throw new Error('Email ou senha incorretos');
      } else if (error.message?.includes('404')) {
        throw new Error('Usuário não encontrado');
      } else if (error.message?.includes('500')) {
        throw new Error('Erro interno do servidor. Tente novamente.');
      } else if (error.message?.includes('Network')) {
        throw new Error('Erro de conexão. Verifique sua internet.');
      } else {
        throw new Error(error.message || 'Erro inesperado ao fazer login');
      }
    } finally {
      setLoading(false);
    }
  }

  async function register(nome: string, email: string, senha: string) {
    try {
      setLoading(true);
      
      // Validações básicas
      if (!nome || !email || !senha) {
        throw new Error('Todos os campos são obrigatórios');
      }
      
      if (nome.length < 2) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        throw new Error('Email deve ter um formato válido');
      }
      
      if (senha.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      console.log('📝 Tentando registrar usuário...');
      const response = await registerService(nome, email, senha);
      
      const { token: authToken, usuario: authUsuario } = response;

      if (!authToken || !authUsuario) {
        throw new Error('Resposta do servidor inválida');
      }

      await AsyncStorage.setItem('@FleetZone:token', authToken);
      await AsyncStorage.setItem('@FleetZone:user', JSON.stringify(authUsuario));

      setToken(authToken);
      setUsuario(authUsuario);
      
      console.log('✅ Registro realizado com sucesso:', authUsuario.nome);
    } catch (error: any) {
      console.error('❌ Erro no registro:', error);
      
      // Melhores mensagens de erro para o usuário
      if (error.message?.includes('409') || error.message?.includes('already exists')) {
        throw new Error('Este email já está cadastrado');
      } else if (error.message?.includes('400')) {
        throw new Error('Dados inválidos. Verifique as informações.');
      } else if (error.message?.includes('500')) {
        throw new Error('Erro interno do servidor. Tente novamente.');
      } else if (error.message?.includes('Network')) {
        throw new Error('Erro de conexão. Verifique sua internet.');
      } else {
        throw new Error(error.message || 'Erro inesperado ao criar conta');
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      console.log('🚪 Fazendo logout...');
      
      // Limpar dados locais
      await AsyncStorage.multiRemove([
        '@FleetZone:token',
        '@FleetZone:user'
      ]);
      
      // Limpar estado da aplicação
      setToken(null);
      setUsuario(null);
      
      console.log('✅ Logout realizado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
      // Mesmo com erro, limpar o estado local
      setToken(null);
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}