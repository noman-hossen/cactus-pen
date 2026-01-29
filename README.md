# AI Paragraph Writer

A full-stack application for generating AI-powered paragraphs. This monorepo contains both the backend service and a Vue 3 frontend interface.

## Project Overview
- **Backend:** TypeScript/Hono service proxying Hugging Face Router API
- **Frontend:** Vue 3 web interface for paragraph generation

## Features
- **Full-stack application** with Vue 3 frontend and TypeScript/Hono backend
- **AI-powered paragraph generation** using Hugging Face Router (DeepSeek-V3.2 model)
- **Modern UI** with real-time preview, token control slider, and copy-to-clipboard functionality
- **Backend API** for centralized Hugging Face API key management and input validation
- **CORS-enabled** backend supporting cross-origin requests from frontend
- **Fully implemented** and ready to use with Bun runtime
- **Responsive design** with error handling and loading states

## Repository Structure
```
ai-paragraph-backend/
├── src/                          # Backend source files
│   ├── index.ts                  # Hono app setup, CORS config, health check
│   ├── routes/
│   │   └── generate.ts           # POST /api/generate route with validation
│   ├── services/
│   │   └── hf.ts                 # HuggingFaceService for API calls
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── test-env.js               # Environment testing utility
│
├── frontend/                     # Vue 3 + Vite frontend application
│   ├── src/
│   │   ├── App.vue              # Main app with paragraph generation UI
│   │   ├── main.js              # Vue app entry point
│   │   ├── style.css            # Global styles
│   │   ├── components/
│   │   │   └── ParagraphGenerator.vue  # Reusable generator component
│   │   ├── views/
│   │   │   └── HomeView.vue     # Home page view
│   │   └── assets/              # Static assets
│   ├── public/                  # Static files
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite build config
│   ├── package.json             # Frontend dependencies
│   └── README.md                # Frontend documentation
│
├── routes/                      # Additional route definitions
├── vue/                         # Vue utilities and setup
├── package.json                 # Backend dependencies & scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Requirements
- Bun (recommended) — used for running and development
- A Hugging Face API key with router permissions

## Environment
Create a `.env` file at the project root and set your Hugging Face API key:

```
HF_API_KEY=your_hf_api_key_here
PORT=3000   # optional, defaults to 3000
```

## Installation & Run

### Backend Setup
```bash
# Install dependencies
bun install

# Create .env file with your Hugging Face API key
echo "HF_API_KEY=your_hf_api_key_here" > .env

# Run in development mode (with file watch)
bun run dev

# Or run in production mode
bun run start
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build
```

For detailed frontend instructions, see [frontend/README.md](frontend/README.md).

## API Endpoints

### Health Check
**GET** `/`

Returns service status and environment setup.

**Response (200):**
```json
{
  "status": "ok",
  "message": "AI Paragraph Writer Backend",
  "hf_api_key_loaded": true,
  "timestamp": "2026-01-29T10:00:00.000Z"
}
```

### Generate Paragraph
**POST** `/api/generate`

Generates a paragraph using the specified prompt.

**Request body:**
```json
{
  "prompt": "Write a short paragraph about renewable energy.",
  "model": "deepseek-ai/DeepSeek-V3.2:novita",  // optional
  "max_tokens": 300                              // optional, defaults to 300
}
```

**Response (200):**
```json
{
  "success": true,
  "result": "Generated paragraph text from DeepSeek..."
}
```

**Error responses:**
- **400** — Validation error (e.g., missing or empty `prompt`)
  ```json
  {
    "success": false,
    "message": "Prompt is required and must be a non-empty string"
  }
  ```
- **500** — Server or Hugging Face API error
  ```json
  {
    "success": false,
    "message": "Failed to generate paragraph",
    "error": "HF API Error details..."
  }
  ```

### Default Configuration
- **Default Model:** `deepseek-ai/DeepSeek-V3.2:novita`
- **Default Max Tokens:** 300
- **Temperature:** 0.7 (configured in backend)

## Quick Start (Full Stack)

### Terminal 1 — Backend
```bash
# In project root
bun install
bun run dev
# Server runs on http://localhost:3000
```

### Terminal 2 — Frontend
```bash
# In project root
cd frontend
bun install
bun run dev
# Frontend runs on http://localhost:5173
```

Open `http://localhost:5173` in your browser to use the application.

## Testing / Quick Check

### API Endpoint (without frontend)
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Write a friendly paragraph about TypeScript."}'
```

### Via Frontend
1. Start both backend and frontend (see Quick Start above)
2. Open `http://localhost:5173`
3. Enter a prompt and generate paragraphs

## Troubleshooting
- **Backend connection refused:** Ensure backend is running with `bun run dev` in the root directory.
- **HF Error responses:** Verify `HF_API_KEY` is set in `.env` and the model is available on Hugging Face Router.
- **Frontend CORS errors:** Ensure backend CORS is enabled (it is by default).
- **Build fails:** Clear `node_modules/`, `.vite/`, and reinstall dependencies.

## Implementation Details

### Backend Architecture
- **Framework:** Hono.js (lightweight and fast)
- **Runtime:** Bun (native TypeScript execution)
- **API Integration:** Hugging Face Router (`https://router.huggingface.co/v1/chat/completions`)
- **Model:** DeepSeek-V3.2 (via Novita provider)

### Frontend Architecture
- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite (fast HMR development)
- **HTTP Client:** Fetch API
- **Styling:** CSS with responsive design
- **Features:** Token slider, copy-to-clipboard, error handling, loading states

### Key Components
- `src/services/hf.ts` — Manages Hugging Face API communication with proper error handling
- `src/routes/generate.ts` — Validates input and handles paragraph generation requests
- `frontend/src/App.vue` — Main UI with full paragraph generation workflow
- `frontend/src/components/ParagraphGenerator.vue` — Reusable generator component

## Documentation
- [Backend API Documentation](#api-endpoints) — See above for detailed endpoint documentation
- [Frontend Documentation](frontend/README.md) — See frontend README for UI setup and development

## License
See the project root for licensing details
- Check console logs for the presence of `HF_API_KEY` — the server prints a warning if the key is missing.

## Testing / Quick Check
1. Ensure `.env` contains `HF_API_KEY`.
2. Start server: `bun run dev`
3. Use `curl` or Postman to call the endpoint:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Write a friendly paragraph about TypeScript."}'
```

## Troubleshooting
- If you get `HF Error` responses, verify the key and model availability on Hugging Face Router.
- If the server logs `HF_API_KEY is missing`, ensure `.env` is loaded and contains the key.

## License
See the project root for licensing details.

---
If you want, I can also add example curl requests, a Postman collection, or extend the README with deployment instructions (Docker / Cloud).
# AI Paragraph Writer Backend

A production-ready backend for generating AI paragraphs using Hugging Face Router.

## Features
- Generate paragraphs from prompts
- Secure proxy to Hugging Face Router
- TypeScript with Hono framework
- Bun runtime

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install