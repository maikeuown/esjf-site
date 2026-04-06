# Escola Secundária José Falcão - Website Oficial

Website oficial da Escola Secundária José Falcão (ESJF), Coimbra, Portugal.

Um website moderno, rápido e totalmente responsivo para uma das escolas mais históricas de Portugal.

## 🏫 Sobre a Escola

- **Nome:** Escola Secundária José Falcão
- **Localização:** Coimbra, Portugal
- **Morada:** Av. Dom Afonso Henriques, Apartado 2071, 3001-654 Coimbra
- **Contactos:** 239 487 170 / 171 / 172
- **História:** Fundada em 1936 como Liceu D. João III, um dos primeiros três Liceus de Portugal
- **Classificação:** Monumento de Interesse Público
- **Reabilitação:** Projeto de 23,8 milhões de euros em curso

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 15+ (App Router) com TypeScript
- **Estilo:** Tailwind CSS + shadcn/ui + Radix UI
- **Base de Dados:** Supabase (PostgreSQL) com Row Level Security
- **Autenticação:** Supabase Auth (email/password + magic links)
- **Armazenamento:** Supabase Storage
- **Deploy:** Vercel
- **Editor Rich Text:** Tiptap (ProseMirror)
- **Formulários:** React Hook Form + Zod
- **Calendário:** FullCalendar.js

## 📋 Pré-requisitos

- Node.js 18+ e npm
- Conta no [Supabase](https://supabase.com)
- Conta no [Vercel](https://vercel.com) (opcional para deploy)

## 🚀 Instalação e Setup

### 1. Clonar o Repositório

```bash
git clone https://github.com/your-username/esjf-site.git
cd esjf-site
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar o Supabase

#### 3.1 Criar Projeto Supabase

1. Aceda a [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Crie um novo projeto

#### 3.2 Configurar a Base de Dados

1. No painel do Supabase, vá a **SQL Editor**
2. Copie e cole o conteúdo do ficheiro `supabase/schema.sql`
3. Execute o script para criar todas as tabelas, políticas de segurança e dados iniciais

#### 3.3 Configurar Storage Buckets

1. Vá a **Storage** no painel do Supabase
2. Crie os seguintes buckets (todos públicos):
   - `news-images`
   - `event-images`
   - `documents`
   - `media`
   - `highlights`
   - `avatars`

3. Para cada bucket, adicione as seguintes políticas:
   - **Public Access** (SELECT): Permitir leitura pública
   - **Authenticated Upload** (INSERT): Permitir upload a utilizadores autenticados

#### 3.4 Obter as Credenciais

1. Vá a **Settings > API**
2. Copie:
   - **Project URL**
   - **anon/public key**
   - **service_role key** (mantenha em segredo!)

### 4. Configurar Variáveis de Ambiente

1. Copie o ficheiro de exemplo:

```bash
cp .env.local.example .env.local
```

2. Edite o ficheiro `.env.local` com as suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-id-de-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Criar Primeiro Utilizador Admin

1. Vá a **Authentication > Users** no Supabase
2. Clique em **Add User > Create new user**
3. Crie um utilizador com:
   - Email: `admin@esjf.pt`
   - Password: (escolha uma senha segura)
   - User metadata:
     ```json
     {
       "full_name": "Administrador",
       "role": "admin"
     }
     ```

### 6. Executar em Desenvolvimento

```bash
npm run dev
```

Aceda a [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
esjf-site/
├── public/                 # Ficheiros estáticos
│   └── robots.txt
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (public pages) # Páginas públicas
│   │   ├── admin/         # Área de administração
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Página inicial
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes shadcn/ui
│   │   ├── layout/       # Header e Footer
│   │   └── admin/        # Componentes do admin
│   ├── hooks/            # React hooks personalizados
│   ├── lib/              # Utilitários e configurações
│   │   ├── supabase/     # Clientes Supabase
│   │   └── utils.ts      # Funções utilitárias
│   └── types/            # Definições TypeScript
│       └── database.types.ts
├── supabase/
│   └── schema.sql        # Schema da base de dados
├── .env.local.example    # Exemplo de variáveis de ambiente
└── package.json
```

## 🌐 Páginas Públicas

### Principais Secções

- **Página Inicial** - Carrossel de destaques, acesso rápido, notícias recentes, próximos eventos
- **A Escola** - História, Missão e Valores, Órgãos de Gestão, Instalações
- **Oferta Educativa** - Ensino Básico, Secundário, Cursos Profissionais
- **Notícias** - Listagem com pesquisa, filtros e paginação
- **Eventos** - Calendário de eventos futuros
- **Projetos** - Erasmus+, Olimpíadas, Desporto Escolar, etc.
- **Serviços** - Secretaria, Biblioteca, SPO
- **Plataformas Digitais** - Links para Inovar, Moodle, SIGA, etc.
- **Documentos** - Downloads organizados por categorias
- **Contactos** - Formulário de contacto, morada, mapa

## 🔐 Área de Administração (`/admin`)

### Acesso

1. Aceda a `/login`
2. Autentique-se com email/senha ou link mágico
3. Será redirecionado para o painel admin

### Funcionalidades

#### Dashboard
- Visão geral com contadores
- Ações rápidas
- Atividade recente

#### Gestão de Notícias
- Criar, editar e eliminar notícias
- Editor rich text (Tiptap) com formatação completa
- Categorias e estados (rascunho, publicado, agendado)
- Imagem de destaque e resumo

#### Gestão de Eventos
- Criar e gerir eventos com datas e localização
- Estados de publicação
- Links externos opcionais

#### Gestão de Páginas
- Páginas estáticas do site
- Publicar/despublicar páginas

#### Gestão de Documentos
- Upload de ficheiros PDF, regulamentos, circulares, etc.
- Organização por categorias
- Contador de downloads

#### Gestão de Media
- Upload e organização de imagens
- Preview e busca

#### Gestão de Destaques
- Gerir carrossel da homepage
- Ordenar destaques
- Ativar/desativar

#### Gestão de Utilizadores
- Ver todos os utilizadores registados
- Funções: admin, editor, secretary

#### Mensagens Recebidas
- Ver mensagens do formulário de contactos
- Marcar como lidas
- Apagar mensagens

### Roles (Funções)

- **admin** - Acesso completo a todas as funcionalidades
- **editor** - Pode criar/editar notícias, eventos e documentos
- **secretary** - Acesso limitado a comunicações e documentos

## 🚀 Deploy na Vercel

### 1. Preparar o Repositório

```bash
git add .
git commit -m "Initial commit: ESJF website"
git push origin main
```

### 2. Conectar à Vercel

1. Aceda a [https://vercel.com](https://vercel.com)
2. Faça login com a sua conta GitHub
3. Clique em **Import Project**
4. Selecione o repositório `esjf-site`

### 3. Configurar Variáveis de Ambiente

Na Vercel, adicione as mesmas variáveis de ambiente do `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (defina como o URL de produção)

### 4. Deploy

Clique em **Deploy** e aguarde a conclusão.

### 5. Configurar Domínio Personalizado (Opcional)

1. Vá a **Settings > Domains** na Vercel
2. Adicione o seu domínio (ex: `esjf.pt`)
3. Configure os registos DNS conforme indicado pela Vercel

## 🔄 Revalidação Automática

O site utiliza **Incremental Static Regeneration (ISR)** com revalidação on-demand:

- Após qualquer alteração no admin (criar/editar/apagar notícias, eventos, etc.)
- As páginas públicas são automaticamente revalidadas
- Não é necessário redeploy para atualizar conteúdos

## 🎨 Design e Estilo

- **Cores da marca:** Tons de azul (#1e40af como primária)
- **Mobile-first:** Totalmente responsivo
- **Dark mode:** Suporte completo a tema escuro
- **Acessibilidade:** Conforme WCAG
- **RGPD:** Conformidade com proteção de dados

## 🔒 Segurança

- **Row Level Security (RLS)** no Supabase
- **Validação no servidor** em todas as operações
- **Proteção de rotas** admin com middleware
- **Service role key** nunca exposta no cliente
- **Políticas de storage** restritivas

## 📝 Scripts Disponíveis

```bash
npm run dev          # Executar em desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar servidor de produção
npm run lint         # Verificar código com ESLint
```

## 🗃️ Base de Dados - Tabelas Principais

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Perfis de utilizadores (estende auth.users) |
| `news` | Notícias do site |
| `news_categories` | Categorias de notícias |
| `events` | Eventos e calendário |
| `pages` | Páginas estáticas |
| `documents` | Documentos para download |
| `media` | Galeria de media |
| `highlights` | Destaques do carrossel |
| `contact_messages` | Mensagens do formulário |

## 🆘 Suporte e Manutenção

### Problemas Comuns

**Erro de conexão ao Supabase:**
- Verifique as variáveis de ambiente em `.env.local`
- Certifique-se de que o projeto Supabase está ativo

**Erro de autenticação:**
- Verifique se o utilizador existe em Supabase > Authentication
- Confirme que o metadata `role` está definido

**Imagens não carregam:**
- Verifique se os buckets de storage estão criados e públicos
- Confirme as políticas de acesso ao storage

### Contactos de Suporte Técnico

Para assistência técnica, contacte o administrador do sistema.

## 📄 Licença

Este projeto foi desenvolvido para a Escola Secundária José Falcão.

## 🙏 Créditos

Desenvolvido com ❤️ para a comunidade educativa da ESJF.

---

**Escola Secundária José Falcão**  
Av. Dom Afonso Henriques, Apartado 2071, 3001-654 Coimbra  
Telefone: 239 487 170 / 171 / 172 | Email: geral@esjf.pt
