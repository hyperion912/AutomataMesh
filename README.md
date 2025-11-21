# AutomataMesh

> ⚠️ **Work in Progress**: AutomataMesh is currently under active development. Features and APIs may change.

A powerful visual workflow automation platform that enables users to create, manage, and execute complex workflows through an intuitive drag-and-drop interface.

## ✨ Features

- **Visual Workflow Builder** - Drag-and-drop interface powered by React Flow for creating complex automation workflows.
- **Node-Based Architecture** - Modular node system supporting a variety of triggers, actions, and integrations.
- **Real-Time Execution** - Background job processing with Inngest for reliable workflow execution.
- **Type-Safe APIs** - End-to-end type safety with tRPC and TypeScript.
- **Authentication & Authorization** - Secure user management with Better Auth (email/password + OAuth).
- **Subscription Management** - Integrated payment and subscription handling via Polar.
- **AI Integration Ready** - Built-in support for OpenAI, Anthropic, and Google AI SDKs.
- **Secure Credential Management** - Encrypted storage for third-party API keys and secrets.
- **Expanded Trigger & Action Library** - Includes nodes for webhooks, Stripe events, Discord, Slack, and more.
- **Error Monitoring** - Comprehensive error tracking with Sentry.

## 🛠️ Tech Stack

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | Next.js | 15.5.4 | React framework with App Router & Turbopack |
| Runtime | React | 19.1.0 | UI library |
| Language | TypeScript | 5.x | Type-safe development |
| Styling | Tailwind CSS | 4.x | Utility-first CSS framework |

### Frontend Stack

| Package | Version | Purpose |
|---------|---------|---------|
| @xyflow/react | 12.9.1 | Visual node-based workflow editor |
| Radix UI | Various | Accessible component primitives |
| Jotai | 2.15.0 | Atomic state management |
| TanStack Query | 5.90.3 | Server state management |
| React Hook Form | 7.65.0 | Form handling |
| Zod | 4.1.12 | Schema validation |
| Lucide React | 0.545.0 | Icon library |
| Sonner | 2.0.7 | Toast notifications |

### Backend & Database

| Package | Version | Purpose |
|---------|---------|---------|
| tRPC | 11.6.0 | Type-safe API layer |
| Prisma | 6.17.1 | Database ORM |
| PostgreSQL | - | Primary database |
| Better Auth | 1.3.26 | Authentication solution |
| Inngest | 3.44.3 | Background job processing |

### AI & Integrations

| Package | Version | Purpose |
|---------|---------|---------|
| Vercel AI SDK | 5.0.76 | Unified AI SDK |
| @ai-sdk/openai | 2.0.53 | OpenAI integration |
| @ai-sdk/anthropic | 2.0.35 | Anthropic Claude integration |
| @ai-sdk/google | 2.0.23 | Google AI integration |
| Polar SDK | 0.35.4 | Subscription management |

### DevOps & Monitoring

- **Sentry** - Error tracking and performance monitoring
- **Polar** - Payment and subscription management
- **Biome** - Fast linting and code formatting
- **mprocs** - Multi-process orchestration for development

## 📁 Project Structure

```
AutomataMesh/
├── prisma/                      # Database schema and migrations
│   ├── schema.prisma           # Prisma schema definition
│   └── migrations/             # Database migration history
│
├── public/                      # Static assets
│   └── logos/                  # Brand assets and logos
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages (login, signup)
│   │   ├── (dashboard)/       # Main application dashboard
│   │   │   ├── (editor)/      # Workflow editor routes
│   │   │   └── (rest)/        # Other dashboard pages
│   │   └── api/               # API routes
│   │       ├── auth/          # Authentication endpoints
│   │       ├── trpc/          # tRPC API handler
│   │       └── inngest/       # Inngest webhook handler
│   │
│   ├── components/             # Reusable UI components
│   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   └── react-flow/        # Custom React Flow components
│   │
│   ├── features/              # Feature-based modules
│   │   ├── auth/             # Authentication logic & components
│   │   ├── editor/           # Workflow editor functionality
│   │   ├── workflows/        # Workflow management
│   │   ├── executions/       # Workflow execution nodes
│   │   ├── triggers/         # Workflow trigger nodes
│   │   └── subscriptions/    # Subscription management
│   │
│   ├── lib/                   # Utility libraries and configurations
│   │   ├── auth.ts           # Better Auth setup
│   │   ├── db.ts             # Prisma client
│   │   ├── polar.ts          # Polar SDK setup
│   │   └── utils.ts          # Helper functions
│   │
│   ├── trpc/                  # tRPC configuration
│   │   ├── routers/          # API route definitions
│   │   ├── init.ts           # tRPC initialization
│   │   └── client.tsx        # Client-side tRPC setup
│   │
│   ├── inngest/               # Background job definitions
│   │   ├── client.ts         # Inngest client
│   │   └── function.ts       # Workflow execution functions
│   │
│   ├── hooks/                 # Shared React hooks
│   ├── config/                # Application configuration
│   └── generated/             # Auto-generated files (Prisma client)
│
├── biome.json                 # Biome configuration
├── components.json            # shadcn/ui configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── mprocs.yaml                # Multi-process configuration
```

## 💾 Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

| Model | Purpose | Key Relationships |
|-------|---------|-------------------|
| **User** | User accounts and profiles | → Sessions, Accounts, Workflows, Credentials |
| **Session**| Active user sessions | → User |
| **Account**| OAuth provider accounts | → User |
| **Workflow**| Workflow definitions | → User, Nodes, Connections, Executions |
| **Node**| Individual workflow nodes | → Workflow, Credential |
| **Connection**| Connections between nodes| → Workflow, Nodes |
| **Credential**| Securely stored API keys and secrets | → User, Node |
| **Execution**| Records of workflow runs | → Workflow |

### Node Types

Currently supported node types:
- **Triggers**: `MANUAL_TRIGGER`, `HTTP_REQUEST`, `GOOGLE_FORM_TRIGGER`, `STRIPE_TRIGGER`
- **Actions**: `DISCORD`, `SLACK`
- **AI**: `OPENAI`, `ANTHROPIC`, `GEMINI`
- **Internal**: `INITIAL` (starting node for every workflow)

More node types are in development.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **PostgreSQL** database
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `ENCRYPTION_KEY` | ✅ | Secret for encrypting credentials (generate with `openssl rand -base64 32`)|
| `BETTER_AUTH_SECRET` | ✅ | Secret key for authentication (generate with `openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | ✅ | Application base URL (e.g., `http://localhost:3000`) |
| `POLAR_ACCESS_TOKEN` | ✅ | Polar API access token |
| `POLAR_SUCCESS_URL` | ⚠️ | Redirect URL after successful checkout |
| `SENTRY_DSN` | ⚠️ | Sentry project DSN for error tracking |
| `SENTRY_ORG` | ⚠️ | Sentry organization slug |
| `SENTRY_PROJECT` | ⚠️ | Sentry project slug |
| `INNGEST_EVENT_KEY` | ✅ | Inngest event key |
| `INNGEST_SIGNING_KEY` | ✅ | Inngest signing key for webhook verification |
| `OPENAI_API_KEY` | ⚠️ | OpenAI API key (optional) |
| `ANTHROPIC_API_KEY` | ⚠️ | Anthropic API key (optional) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | ⚠️ | Google AI API key (optional) |

✅ Required | ⚠️ Optional/Conditional

Example `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/automatamesh"
ENCRYPTION_KEY="your-encryption-key-here"
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
POLAR_ACCESS_TOKEN="polar_xxx"
INNGEST_EVENT_KEY="inngest_xxx"
INNGEST_SIGNING_KEY="signkey_xxx"
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/automatamesh.git
   cd automatamesh
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Copy the example above and create a `.env` file with your configuration.

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

6. **Start the development server**
   
   **Option A: Run all services with mprocs (recommended)**
   ```bash
   npm run dev:all
   ```
   This starts the Next.js dev server, Inngest dev server, and an ngrok tunnel.

   **Option B: Run services separately**
   
   Terminal 1 - Next.js:
   ```bash
   npm run dev
   ```
   
   Terminal 2 - Inngest:
   ```bash
   npm run inngest:dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server with Turbopack |
| `npm run inngest:dev` | Start Inngest development server |
| `npm run dev:all` | Run all services concurrently with mprocs |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run Biome linter |
| `npm run format` | Format code with Biome |
| `npx prisma migrate dev` | Create and apply database migrations |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma generate` | Generate Prisma client |

## 🏗️ Architecture

### Feature-Based Structure

The codebase is organized around features rather than technical layers. Each feature module (`src/features/`) contains its own components, hooks, and business logic, promoting better code organization and maintainability.

### Type-Safe APIs

AutomataMesh uses **tRPC** to provide end-to-end type safety between the frontend and backend. API routes are defined in `src/trpc/routers/` and automatically generate TypeScript types that are used on the client side.

### Visual Workflow Editor

The workflow editor is built with **React Flow**, providing a powerful and flexible drag-and-drop interface for creating complex automation workflows. Custom node types are defined in `src/components/` and `src/features/`.

### Background Job Processing

**Inngest** handles all background workflow execution, providing:
- Reliable job processing
- Automatic retries
- Event-driven architecture
- Built-in observability

### State Management

- **Jotai** for local component state
- **TanStack Query** for server state and caching
- **React Flow** internal state for workflow editor

## 🔄 Current Development Status
| Feature | Status | Notes |
|---------|---------|------|
| User Authentication | ✅ Complete | Email/password + OAuth support (Google, GitHub) |
| Visual Workflow Editor | ✅ Complete | Drag-and-drop interface |
| Database Schema | ✅ Complete | Core models for users, workflows, nodes, etc. |
| Expanded Node Library | ✅ Complete | Triggers, actions, and all AI nodes are implemented |
| AI Integrations | ✅ Complete | Support for OpenAI, Anthropic, and Google AI |
| Background Processing | ✅ Complete | Inngest integration for workflow execution |
| Workflow Execution Engine | ✅ Complete | Node execution logic and data flow |
| Credentials Management | ✅ Complete | Secure storage for API keys and secrets |
| Execution History | ✅ Complete | View and debug past workflow runs |
| API Integrations | 📋 Planned | Pre-built integrations with popular services |
| Workflow Templates | 📋 Planned | Ready-to-use workflow templates |

**Legend:** ✅ Complete | 🚧 In Progress | 📋 Planned

## 🤝 Contributing

As this project is currently under active development, contribution guidelines will be established soon. For now, feel free to:
- Report bugs via GitHub issues
- Suggest features and improvements
- Submit pull requests for bug fixes

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [React Flow](https://reactflow.dev/) - Node-based UI
- [Prisma](https://www.prisma.io/) - Database toolkit
- [tRPC](https://trpc.io/) - Type-safe APIs
- [Inngest](https://www.inngest.com/) - Background jobs
- [Better Auth](https://better-auth.com/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---
