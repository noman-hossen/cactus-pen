# AI Paragraph Writer - Monorepo

A full-stack application for generating AI-powered paragraphs with Vue 3 frontend and Hono backend.

## Project Structure

```
ai-paragraph-writer/
├── backend/                    # Backend API (Hono + TypeScript)
│   ├── src/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                   # Frontend UI (Vue 3 + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── utils/
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── package.json               # Root monorepo configuration
└── README.md                  # This file
```

## Quick Start

### Prerequisites
- [Bun](https://bun.sh) (recommended) or Node.js 18+
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-paragraph-writer

# Install dependencies for all workspaces
bun install
```

### Development

```bash
# Run both backend and frontend in development mode
bun run dev

# Or run individually
bun run dev:backend
bun run dev:frontend
```

### Production Build

```bash
# Build all packages
bun run build

# Start backend
bun run start
```

## Features

### Backend
- REST API with Hono framework
- AI content generation via Hugging Face
- Model fallback system
- TypeScript type safety
- Error handling & validation

### Frontend
- Vue 3 with Composition API
- Pinia state management
- Responsive design
- Copy-to-clipboard functionality
- PDF export support
- Real-time loading states

## API Documentation

See [backend/README.md](backend/README.md) for detailed API documentation.

## Frontend Documentation

See [frontend/README.md](frontend/README.md) for detailed frontend documentation.

## Development Workflow

1. Backend runs on `http://localhost:3000`
2. Frontend runs on `http://localhost:5173`
3. Frontend API calls proxy to backend

## Contributing

1. Create a feature branch
2. Make changes in respective workspace (backend or frontend)
3. Test thoroughly
4. Submit pull request

## License

MIT

## Support

For issues and questions, please refer to the individual README files in each workspace.
