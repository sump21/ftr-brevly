# Brevly - Encurtador de URLs

Um encurtador de URLs moderno e completo, desenvolvido com React (frontend) e Node.js (backend), utilizando PostgreSQL como banco de dados.

## 📋 Funcionalidades

### API (Backend)
- ✅ Criar links encurtados
- ✅ Validação de formato de URL encurtada
- ✅ Verificação de URLs encurtadas duplicadas
- ✅ Deletar links
- ✅ Obter URL original através do link encurtado
- ✅ Listar todas as URLs cadastradas
- ✅ Incrementar contador de acessos
- ✅ Exportar relatório em CSV
- ✅ Upload para CDN (Cloudflare R2)
- ✅ Geração de nomes únicos para arquivos
- ✅ Listagem performática
- ✅ Campos: URL original, URL encurtada, acessos, data de criação

### Frontend (Web)
- ✅ Interface React SPA com Vite
- ✅ Design responsivo (desktop e mobile)
- ✅ Layout baseado no Figma (https://www.figma.com/community/file/1477335071553579816/encurtador-de-links)
- ✅ Criar e gerenciar links encurtados
- ✅ Visualizar estatísticas de acesso
- ✅ Download de relatórios CSV
- ⏳ Estados de carregamento e empty states

## 🚀 Tecnologias

### Backend
- Node.js com TypeScript
- Fastify - Framework web
- Drizzle ORM - ORM para PostgreSQL
- PostgreSQL - Banco de dados
- Zod - Validação de schemas
- Docker - Containerização

### Frontend
- React com TypeScript
- Vite - Build tool e bundler
- Axios - Cliente HTTP
- Tailwind CSS - Estilização

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js 20+
- PostgreSQL
- Docker (opcional)
- pnpm

### Variáveis de Ambiente

#### Backend (server/.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/brevly
PORT=3000
```

#### Frontend (web/.env)
```
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3000
```

### Instalação Local

1. Clone o repositório
```bash
git clone https://github.com/sump21/ftr-brevly.git
cd ftr-brevly
```

2. Configure o Backend
```bash
cd server
pnpm install
```

3. Configure o banco de dados

Gerar tipos do Drizzle:
```bash
pnpm db:generate
```

Executar migrações:
```bash
pnpm db:migrate
```

4. Inicie o backend
```bash
pnpm dev
```

5. Configure o Frontend
```bash
cd ../web
pnpm install
pnpm dev
```