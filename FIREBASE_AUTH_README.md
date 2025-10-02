# Autenticação Firebase - FleetZone

Este documento descreve as telas de login e cadastro criadas para o projeto FleetZone.

## 📁 Estrutura Criada

```
src/
├── services/
│   └── firebase/
│       ├── index.ts          # Exporta todos os serviços
│       ├── config.ts         # Configuração do Firebase
│       └── auth.ts           # Serviços de autenticação

app/
├── auth/
│   ├── login.tsx            # Tela de Login
│   └── register.tsx         # Tela de Cadastro
```

## 🔥 Como Configurar o Firebase

### 1. Instalar as dependências do Firebase
```bash
npm install firebase
```

### 2. Configurar as credenciais no arquivo `config.ts`
Edite o arquivo `src/services/firebase/config.ts` e adicione suas credenciais:

```typescript
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "sua-app-id"
};

export const app = initializeApp(firebaseConfig);
```

### 3. Implementar as funções de autenticação no arquivo `auth.ts`
Edite o arquivo `src/services/firebase/auth.ts`:

```typescript
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { app } from './config';

const auth = getAuth(app);

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export const signInWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logOut = async () => {
  await signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
```

## 🚀 Como Acessar as Telas

### Método 1: URLs Diretas
No Expo, você pode navegar diretamente para as telas usando as URLs:

- **Login**: `http://localhost:8081/auth/login`
- **Cadastro**: `http://localhost:8081/auth/register`

### Método 2: Navegação Programática
Nas telas existentes, você pode adicionar navegação programática:

```typescript
import { router } from 'expo-router';

// Para ir para login
router.push('/auth/login');

// Para ir para cadastro
router.push('/auth/register');
```

## 🎨 Funcionalidades das Telas

### Tela de Login (`/auth/login`)
- ✅ Campos de email e senha
- ✅ Validação básica
- ✅ Design responsivo
- ✅ Integração com tema do app
- ✅ Link para tela de cadastro
- 🔄 **Pendente**: Integração com Firebase Auth

### Tela de Cadastro (`/auth/register`)
- ✅ Campos: nome, email, senha, confirmar senha
- ✅ Validação de formulário
- ✅ Validação de email
- ✅ Verificação de senhas coincidentes
- ✅ Senha mínima de 6 caracteres
- ✅ Design responsivo
- ✅ Link para tela de login
- 🔄 **Pendente**: Integração com Firebase Auth

## 📝 Próximos Passos

1. **Instalar Firebase**: `npm install firebase`
2. **Configurar credenciais** no arquivo `config.ts`
3. **Implementar funções** no arquivo `auth.ts`
4. **Conectar as telas** às funções do Firebase
5. **Adicionar contexto de autenticação** para gerenciar estado global
6. **Implementar navegação condicional** (mostrar login se não autenticado)

## 🎯 Como Testar

1. Execute o projeto: `npm start`
2. No navegador, acesse: `http://localhost:8081/auth/login`
3. Ou use o QR code no dispositivo móvel
4. Teste os formulários de login e cadastro
5. Os alerts mostrarão quando os formulários são preenchidos corretamente

## 🔧 Personalização

As telas usam o sistema de cores do app (`useAccentColor()`), então elas se adaptam automaticamente ao tema escolhido do FleetZone.

Para personalizar os estilos, edite os arquivos:
- `app/auth/login.tsx`
- `app/auth/register.tsx`