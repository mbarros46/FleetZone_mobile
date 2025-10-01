import { login, register } from '../authService';

// Mock fetch
global.fetch = jest.fn();

describe('AuthService', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockResponse = {
        token: 'mock-token-123',
        usuario: {
          id: '1',
          nome: 'João Silva',
          email: 'joao@test.com',
        },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await login('joao@test.com', 'password123');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'joao@test.com', senha: 'password123' }),
        })
      );

      expect(result).toEqual(mockResponse);
    });

    it('should throw error when login fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        text: () => Promise.resolve('Credenciais inválidas'),
      });

      await expect(login('invalid@test.com', 'wrongpassword')).rejects.toThrow(
        'Credenciais inválidas'
      );
    });
  });

  describe('register', () => {
    it('should register successfully with valid data', async () => {
      const mockResponse = {
        token: 'mock-token-456',
        usuario: {
          id: '2',
          nome: 'Maria Silva',
          email: 'maria@test.com',
        },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await register('Maria Silva', 'maria@test.com', 'password123');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/register'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nome: 'Maria Silva', 
            email: 'maria@test.com', 
            senha: 'password123' 
          }),
        })
      );

      expect(result).toEqual(mockResponse);
    });

    it('should throw error when registration fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        text: () => Promise.resolve('Email já cadastrado'),
      });

      await expect(register('João', 'existing@test.com', 'password123')).rejects.toThrow(
        'Email já cadastrado'
      );
    });
  });
});
