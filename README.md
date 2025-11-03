# 🚀 FleetZone Mobile

## 📱 Nome do App
**FleetZone Mobile** - Sistema de Gerenciamento de Frota de Motocicletas

## 🎯 Proposta + Funcionalidades

O FleetZone Mobile é um aplicativo desenvolvido em React Native com Expo para gerenciar frotas de motocicletas de forma eficiente e intuitiva.

### ✨ Funcionalidades Principais

#### 🏠 **Dashboard Principal**
- Visão geral da frota com estatísticas em tempo real
- Cards informativos com status das motocicletas
- Navegação rápida para outras seções
- Interface com gradiente e design moderno

#### 🏍️ **Gerenciamento de Motos**
- Listagem completa das motocicletas cadastradas
- Busca por placa da motocicleta
- Visualização de detalhes (marca, modelo, ano, status)
- Interface responsiva com cards organizados

#### ➕ **Cadastro de Motocicletas**
- Formulário completo de cadastro
- Validação de dados com React Hook Form + Zod
- Campos: Placa, Marca, Modelo, Ano, Cor, Status
- Feedback visual de sucesso/erro

#### ⚙️ **Configurações**
- Alternância entre tema claro e escuro
- Seleção de cores de destaque personalizadas
- Configurações salvas automaticamente
- Interface intuitiva de personalização

### 🛠️ **Tecnologias Utilizadas**
- **React Native** com Expo
- **TypeScript** para tipagem estática
- **React Hook Form** + **Zod** para formulários
- **Expo Linear Gradient** para efeitos visuais
- **Expo Vector Icons** (Ionicons)
- **Context API** para gerenciamento de estado
- **AsyncStorage** para persistência local

## 📁 Estrutura de Pastas

```
FleetZone_mobile/
├── app/                          # Navegação principal (Expo Router)
│   ├── (tabs)/                   # Navegação por abas
│   │   ├── index.tsx            # Tela Home/Dashboard
│   │   ├── motos.tsx            # Listagem de motocicletas
│   │   ├── formulario.tsx       # Cadastro de motos
│   │   └── configuracoes.tsx    # Configurações do app
│   ├── _layout.tsx              # Layout principal
│   └── +not-found.tsx           # Página 404
├── src/                          # Código fonte
│   ├── components/              # Componentes reutilizáveis
│   │   ├── ThemedText.tsx       # Componente de texto com tema
│   │   ├── ThemedView.tsx       # Componente de view com tema
│   │   └── index.ts             # Barrel export
│   ├── contexts/                # Contextos do React
│   │   └── theme.tsx            # Contexto de tema personalizado
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

## 👨‍💻 Desenvolvido por

- Miguel Barros Ramos (RM556652)
- Pedro Valentim Merise (RM556826)
- Thomas Rodrigues (558042)
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

# Inicie o projeto
npx expo start
```

### Execução
- **📱 Android**: Pressione `a` ou escaneie o QR code com Expo Go
- **🍎 iOS**: Pressione `i` ou escaneie o QR code com a câmera
- **🌐 Web**: Pressione `w` para abrir no navegador

## 📋 Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no Android
npm run ios        # Executa no iOS  
npm run web        # Executa no navegador
npm run lint       # Verifica padrões de código
npm run format     # Formata o código
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

## 🏆 Status do Projeto

✅ **Concluído** - Todas as funcionalidades implementadas e testadas

---

## 🧭 API Backend (Java)

O backend em Java expõe endpoints REST que o aplicativo mobile consome. Abaixo está um resumo das rotas e exemplos rápidos para integração.

Base URL (exemplo local):

```
http://localhost:8085/
```

Exemplo para o arquivo `.env` do app mobile:

```
EXPO_PUBLIC_API_URL=http://192.168.0.105:8080
```

Endpoints principais

- Autenticação
	- POST /auth/login
		- Descrição: recebe { email, senha } e retorna um token JWT e dados do usuário.
		- Exemplo body: { "email": "teste@exemplo.com", "senha": "123456" }
	- POST /auth/register (opcional)
		- Descrição: registra um novo usuário.

- Motos (CRUD)
	- GET /motos — lista todas as motos
	- GET /motos/{id} — detalhes da moto
	- POST /motos — cria nova moto (body JSON com campos como modelo, placa, patioId, km)
	- PUT /motos/{id} — atualiza moto
	- DELETE /motos/{id} — remove moto

- Filiais / Pátios
	- GET /filiais — lista pátios/filiais disponíveis
	- GET /filiais/{id} — detalhes da filial

- IoT / Sensor
	- GET /iot/status — retorna status do sensor (online/offline, última leitura)
	- POST /iot/event — envia evento (ex.: detecção de moto)
		- Exemplo body: { "motoId": 123, "action": "detected", "timestamp": "2025-11-02T12:34:56Z" }

Autorização

- Endpoints protegidos retornam 401 sem um header Authorization válido:
- Header: Authorization: Bearer {JWT}

Dica de integração

- Configure `EXPO_PUBLIC_API_URL` para apontar para o host onde o backend Java está rodando.
- No fluxo de login, ao receber o token, o app configura o cliente HTTP (axios) com o header Authorization automaticamente (veja `src/services/axiosApi.ts`).

Se quiser, eu também posso adicionar exemplos de requests curl ou um arquivo Postman/Insomnia para facilitar testes manuais.

