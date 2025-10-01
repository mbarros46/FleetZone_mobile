# 🚀 FleetZone Mobile

## 📱 Nome do App
**FleetZone Mobile** - Sistema de Gerenciamento de Frota de Motocicletas

## 🎯 Proposta + Funcionalidades

O FleetZone Mobile é um aplicativo desenvolvido em React Native com Expo para gerenciar frotas de motocicletas de forma eficiente e intuitiva.

### ✨ Funcionalidades Principais

#### 🔐 **Autenticação Completa**
- Login e cadastro de usuários
- Proteção de rotas (bloqueio sem autenticação)
- Persistência de sessão com AsyncStorage
- Logout seguro com confirmação

#### 🏠 **Dashboard Principal**
- Visão geral da frota com estatísticas em tempo real
- Cards informativos com status das motocicletas
- Navegação rápida para outras seções
- Interface com gradiente e design moderno

#### 🏍️ **Gerenciamento de Motos (CRUD Completo)**
- **Listagem**: Carregamento da API com loading e pull-to-refresh
- **Criação**: Formulário com validação e integração API
- **Edição**: Atualização de dados via API
- **Exclusão**: Remoção com confirmação
- **Estados**: Loading, erro, empty state implementados

#### ➕ **Cadastro de Motocicletas**
- Formulário completo de cadastro
- Validação de dados com React Hook Form + Zod
- Campos: Modelo, Placa, Status
- Integração com API real
- Feedback visual de sucesso/erro

#### ⚙️ **Configurações**
- Alternância entre tema claro e escuro
- Seleção de cores de destaque personalizadas
- Informações da conta do usuário
- Logout com confirmação
- Configurações salvas automaticamente

### 🛠️ **Tecnologias Utilizadas**
- **React Native** com Expo
- **TypeScript** para tipagem estática
- **React Hook Form** + **Zod** para formulários
- **Expo Linear Gradient** para efeitos visuais
- **Expo Vector Icons** (Ionicons)
- **Context API** para gerenciamento de estado
- **AsyncStorage** para persistência local
- **Expo Router** para navegação
- **API REST** para integração backend

## 📁 Estrutura de Pastas

```
FleetZone_mobile/
├── app/                          # Navegação principal (Expo Router)
│   ├── auth/                     # Telas de autenticação
│   │   ├── login.tsx            # Tela de login
│   │   └── register.tsx         # Tela de cadastro
│   ├── (tabs)/                   # Navegação por abas (protegida)
│   │   ├── index.tsx            # Tela Home/Dashboard
│   │   ├── motos.tsx            # Listagem de motocicletas
│   │   ├── formulario.tsx       # Cadastro de motos
│   │   └── configuracoes.tsx    # Configurações do app
│   ├── _layout.tsx              # Layout principal com proteção de rotas
│   └── +not-found.tsx           # Página 404
├── src/                          # Código fonte
│   ├── components/              # Componentes reutilizáveis
│   │   ├── ThemedText.tsx       # Componente de texto com tema
│   │   ├── ThemedView.tsx       # Componente de view com tema
│   │   ├── ControlledInput.tsx  # Input controlado para formulários
│   │   └── index.ts             # Barrel export
│   ├── contexts/                # Contextos do React
│   │   ├── theme.tsx            # Contexto de tema personalizado
│   │   └── auth.tsx             # Contexto de autenticação
│   ├── services/               # Serviços de API
│   │   ├── api.ts               # Configuração da API
│   │   ├── authService.ts       # Serviços de autenticação
│   │   ├── motosService.ts      # Serviços de motos
│   │   └── patiosService.ts     # Serviços de pátios
│   ├── styles/                  # Estilos e temas
│   │   └── theme.ts             # Sistema de cores e temas
│   └── types/                   # Tipagens TypeScript
│       └── index.ts             # Tipos da aplicação
├── hooks/                       # Hooks customizados
│   └── useThemeColor.ts         # Hook para cores do tema
├── constants/                   # Constantes da aplicação
│   └── Colors.ts                # Paleta de cores
├── assets/                      # Recursos estáticos
│   ├── images/                  # Imagens
│   └── fonts/                   # Fontes personalizadas
├── package.json                 # Dependências do projeto
├── tsconfig.json               # Configuração TypeScript
├── expo.json                   # Configuração do Expo
└── README.md                   # Documentação do projeto
```

## 👥 Integrantes do Projeto

| Nome | RM | GitHub |
|------|----|---------| 
| [Miguel Barros] | [556653]  |
| [NOME INTEGRANTE 2] | [556826]  |
| [NOME INTEGRANTE 3] | [] | 
## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18+)
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador

### Instalação
```bash
# Clone o repositório
git clone [URL_DO_SEU_REPOSITORIO]

# Entre na pasta do projeto
cd FleetZone_mobile

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp env.example .env

# Inicie o projeto
npx expo start
```

### 🔧 Configuração de Ambiente

1. **Copie o arquivo de exemplo:**
   ```bash
   cp env.example .env
   ```

2. **Configure a URL da API no arquivo `.env`:**
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:8080
   ```

3. **Certifique-se de que o backend está rodando** na URL configurada.

### 📱 Funcionalidades de Autenticação

- **Login**: Tela de login com validação
- **Cadastro**: Tela de registro com validação de senha
- **Proteção de Rotas**: Acesso bloqueado sem autenticação
- **Persistência**: Sessão mantida entre aberturas do app
- **Logout**: Saída segura com confirmação

### Execução
- **📱 Android**: Pressione `a` ou escaneie o QR code com Expo Go
- **🍎 iOS**: Pressione `i` ou escaneie o QR code com a câmera
- **🌐 Web**: Pressione `w` para abrir no navegador

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no Android
npm run ios        # Executa no iOS  
npm run web        # Executa no navegador

# Qualidade de Código
npm run lint       # Verifica padrões de código
npm run lint:fix   # Corrige problemas de lint
npm run format     # Formata o código
npm run format:check # Verifica formatação
npm test           # Executa testes

# Build e Distribuição
npm run build:android    # Build APK/AAB para Android
npm run build:ios        # Build para iOS
npm run submit:android   # Submeter para Google Play
npm run submit:ios       # Submeter para App Store
npm run distribute       # Configurar distribuição
```

## 🎨 Características do Design

- **Design System** consistente com componentes temáticos
- **Tema Claro/Escuro** com alternância dinâmica
- **Cores Personalizáveis** com 8 opções de destaque
- **Interface Responsiva** adaptável a diferentes tamanhos
- **Animações Suaves** e transições fluidas
- **Ícones Consistentes** da biblioteca Ionicons

## 📱 Capturas de Tela

[Adicione aqui screenshots do seu app funcionando]

## 📦 Distribuição

### 🚀 Build para Produção

```bash
# Build para Android (APK/AAB)
npm run build:android

# Build para iOS
npm run build:ios

# Configurar distribuição
npm run distribute
```

### 📱 Opções de Distribuição

1. **Firebase App Distribution**
   - Build APK via EAS
   - Distribuição interna para testadores
   - Link direto para download

2. **Google Play Store**
   - Build AAB via EAS
   - Submissão automática via `eas submit`
   - Publicação na loja oficial

3. **GitHub Releases**
   - Builds automáticos via GitHub Actions
   - Releases com changelog
   - Download direto dos arquivos

### 🔧 Configuração EAS

O projeto está configurado com EAS Build para builds nativos:

- **Development**: APK para desenvolvimento
- **Preview**: APK para testadores
- **Production**: AAB para Google Play Store

## 🏆 Status do Projeto

✅ **Concluído** - Todas as funcionalidades implementadas e testadas

### ✨ Funcionalidades P3 (Plus)
- ✅ **Internacionalização** (Português + Espanhol)
- ✅ **Notificações Push** com tela de teste
- ✅ **Distribuição** configurada (APK/AAB)

---

