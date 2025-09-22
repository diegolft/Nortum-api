# Nortum API

Uma API Node.js com TypeScript seguindo Clean Architecture, usando TypeORM, JWT para autenticação e bcrypt para hash de senhas.

## 🏗️ Arquitetura

O projeto segue os princípios da Clean Architecture com as seguintes camadas:

- **Domain**: Entidades e interfaces do domínio
- **Application**: Casos de uso e DTOs
- **Infrastructure**: Implementações concretas (banco de dados, autenticação)
- **Presentation**: Controllers, rotas e middlewares

## 🚀 Tecnologias

- **Node.js** com **TypeScript**
- **Express.js** para o servidor web
- **TypeORM** como ORM
- **PostgreSQL** como banco de dados
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **class-validator** para validação
- **helmet** para segurança

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd nortum-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=nortum_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3000
NODE_ENV=development
```

4. Configure o banco de dados PostgreSQL

5. Execute as migrações:

```bash
npm run migration:run
```

## 🏃‍♂️ Executando o projeto

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm run build
npm start
```

## 📚 API Endpoints

### Autenticação

#### POST /api/auth/register

Registra um novo usuário.

**Body:**

```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "username": "johndoe",
  "password": "password123"
}
```

#### POST /api/auth/login

Faz login do usuário.

**Body:**

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "username": "johndoe"
  }
}
```

#### GET /api/health

Verifica o status da API.

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Nortum API"
}
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa a aplicação compilada
- `npm run migration:generate` - Gera uma nova migração
- `npm run migration:run` - Executa as migrações
- `npm run migration:revert` - Reverte a última migração

## 🛡️ Segurança

- **Helmet** para headers de segurança
- **Rate limiting** implementado
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **Validação** de dados com class-validator

## 📁 Estrutura do Projeto

```
src/
├── domain/                 # Camada de domínio
│   ├── entities/          # Entidades do domínio
│   └── repositories/      # Interfaces dos repositórios
├── application/           # Camada de aplicação
│   ├── use-cases/        # Casos de uso
│   ├── dto/              # Data Transfer Objects
│   └── interfaces/       # Interfaces da aplicação
├── infrastructure/       # Camada de infraestrutura
│   ├── database/         # Configuração do banco
│   ├── auth/             # Serviços de autenticação
│   └── config/           # Configurações
├── presentation/         # Camada de apresentação
│   ├── controllers/      # Controllers
│   ├── middleware/       # Middlewares
│   └── routes/           # Rotas
└── shared/               # Utilitários compartilhados
    ├── errors/           # Classes de erro
    └── utils/            # Funções utilitárias
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
