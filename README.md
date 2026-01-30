# AI Paragraph Writer - Full Stack Application

A full-stack application for generating AI-powered paragraphs using modern web technologies. This monorepo contains both the backend service and a Vue 3 frontend interface.

## Quick Summary

| Aspect | Details |
|--------|---------|
| **Purpose** | Generate natural language paragraphs using AI (DeepSeek-V3.2 via Hugging Face) |
| **Backend** | TypeScript/Hono REST API with Hugging Face Router integration |
| **Frontend** | Vue 3 + Vite web interface with real-time generation |
| **Runtime** | Bun (recommended) or Node.js |
| **Key Features** | AI paragraph generation, token control, copy-to-clipboard, error handling |

## Core Features

- ✅ **Full-Stack Application** — Integrated Vue 3 frontend + TypeScript/Hono backend
- ✅ **AI-Powered Generation** — Uses Hugging Face Router with DeepSeek-V3.2 model
- ✅ **Modern UI** — Real-time preview, token control slider, copy-to-clipboard
- ✅ **Secure Backend API** — Centralized HF API key management, input validation
- ✅ **CORS-Enabled** — Frontend-backend communication fully supported
- ✅ **Production Ready** — Error handling, loading states, responsive design
- ✅ **Bun Optimized** — Fast runtime with excellent TypeScript support

## Repository Structure & Modules

```
ai-paragraph-backend/                    ← Root project directory
│
├── src/                                  ← Backend service (TypeScript)
│   ├── index.ts                          ✓ Hono server setup, CORS config, health check (/api/health)
│   ├── routes/
│   │   └── generate.ts                   ✓ POST /api/generate - Main paragraph generation endpoint
│   ├── services/
│   │   └── hf.ts                         ✓ HuggingFaceService - Handles HF API calls & error management
│   ├── types/
│   │   └── index.ts                      ✓ TypeScript interfaces - Request/response types
│   └── test-env.js                       ✓ Environment variable validation tool
│
├── frontend/                             ← Vue 3 + Vite web interface
│   ├── src/
│   │   ├── App.vue                       ✓ Main UI - Input form, token slider, output display
│   │   ├── main.js                       ✓ Vue app initialization
│   │   ├── style.css                     ✓ Global styling
│   │   ├── components/
│   │   │   ├── ParagraphGenerator.vue    ✓ Reusable generator component
│   │   │   ├── FeatureCard.vue           ✓ Feature display cards
│   │   │   ├── FeaturesSection.vue       ✓ Features showcase section
│   │   │   ├── GeneratorSection.vue      ✓ Generator container
│   │   │   ├── AppHeader.vue             ✓ Header navigation
│   │   │   ├── AppFooter.vue             ✓ Footer section
│   │   │   └── Dropdown.vue              ✓ Dropdown UI component
│   │   ├── views/
│   │   │   └── HomeView.vue              ✓ Home page layout
│   │   ├── assets/                       ✓ Images, icons, static assets
│   │   └── utils/
│   │       ├── api.js                    ✓ API communication utilities
│   │       └── pdfExporter.js            ✓ PDF export functionality
│   ├── public/                           ✓ Static files (favicon, etc)
│   ├── index.html                        ✓ HTML entry point
│   ├── vite.config.js                    ✓ Build & dev server config
│   ├── package.json                      ✓ Dependencies & npm scripts
│   └── README.md                         ✓ Frontend documentation
│
├── routes/                               ← Shared route definitions
├── vue/                                  ← Vue utilities & composables
├── package.json                          ← Backend dependencies & scripts
├── tsconfig.json                         ← TypeScript compiler options
└── README.md                             ← This file
```

## Prerequisites

| Requirement | Version | Alternative |
|-------------|---------|-------------|
| **Runtime** | Bun (v1.0+) | Node.js v16+ or npm/yarn |
| **API Key** | Hugging Face Token | Create at huggingface.co |
| **OS** | Windows/Mac/Linux | Any OS with Bun support |

> **Note:** Bun is recommended for superior performance and native TypeScript support, but Node.js also works.

## Environment Setup

### Step 1: Create `.env` File

Create a `.env` file in the project root with your Hugging Face credentials:

```env
# .env file (DO NOT commit to version control)
HF_API_KEY=hf_your_actual_token_here
PORT=3000
NODE_ENV=development
```

**Getting Your HF Token:**
1. Visit [huggingface.co](https://huggingface.co)
2. Sign in or create account
3. Go to Settings → Access Tokens
4. Create new token (requires router API access)
5. Copy token and paste in `.env`

### Step 2: Validate Environment

```bash
# Optional: Test environment setup
node src/test-env.js
# Output should show: HF_API_KEY is set ✓
```

## Quick Start Guide

### Backend Server

```bash
# 1. Install dependencies (run from project root)
bun install

# 2. Start development server (auto-reload on changes)
bun run dev
# Output: Server running at http://localhost:3000

# 3. Or run production server
bun run start
```

**Backend Console Output:**
```
Hono server listening on http://0.0.0.0:3000
✓ CORS enabled
✓ Health check endpoint: GET /api/health
✓ Ready for requests
```

### Frontend Application

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install frontend dependencies
bun install

# 3. Start dev server with hot reload
bun run dev
# Output: Vite dev server running at http://localhost:5173

# 4. Build for production
bun run build
# Output: Generated dist/ folder (optimized bundle)

# 5. Preview production build locally
bun run preview
```

**Browser:** Open http://localhost:5173 in your browser

## Full End-to-End Setup

```bash
# Terminal 1 - Backend Server
bun install
bun run dev
# Waits for http://localhost:3000

# Terminal 2 - Frontend (separate terminal)
cd frontend
bun install
bun run dev
# Open http://localhost:5173 in browser
```

> **Tip:** Keep both servers running during development for live testing

## API Documentation

### Endpoints Summary

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| **GET** | `/api/health` | Server status check | ❌ |
| **POST** | `/api/generate` | Generate paragraph | ❌ |

---

### 1. Health Check Endpoint

**GET** `/api/health`

Check if the backend server is running and configured properly.

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "AI Paragraph Writer Backend",
  "hf_api_key_loaded": true,
  "timestamp": "2026-01-29T10:00:00Z"
}
```

**Error (500):**
```json
{
  "status": "error",
  "message": "HF_API_KEY not configured"
}
```

---

### 2. Generate Paragraph Endpoint

**POST** `/api/generate`

Generate an AI paragraph based on a prompt.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "prompt": "Write about artificial intelligence",
  "model": "deepseek-ai/DeepSeek-V3.2:novita",
  "max_tokens": 300
}
```

| Parameter | Type | Required | Default | Notes |
|-----------|------|----------|---------|-------|
| `prompt` | string | ✅ Yes | — | Text prompt for paragraph generation |
| `model` | string | ❌ No | DeepSeek-V3.2 | Hugging Face model identifier |
| `max_tokens` | number | ❌ No | 300 | Output length (50-2000) |

**Success Response (200 OK):**
```json
{
  "success": true,
  "result": "Artificial intelligence has revolutionized many industries...",
  "tokens_used": 287,
  "generation_time_ms": 2345
}
```

**Error Responses:**

| Status | Error Type | Example |
|--------|-----------|---------|
| **400** | Validation Error | Missing or empty `prompt` |
| **401** | Auth Error | Invalid HF API key |
| **500** | Server Error | HF API failure or network issue |

**Error Response (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Prompt must be a non-empty string"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Generation failed",
  "message": "Hugging Face API Error: Rate limit exceeded"
}
```

---

## Testing the API

### Using cURL (Command Line)

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test generation
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain the benefits of TypeScript",
    "max_tokens": 150
  }'
```

### Using Thunder Client / Postman

1. **New Request** → POST
2. **URL:** `http://localhost:3000/api/generate`
3. **Headers:** `Content-Type: application/json`
4. **Body (JSON):**
   ```json
   {
     "prompt": "Write about renewable energy",
     "max_tokens": 200
   }
   ```
5. **Send**

### Via Frontend UI

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Enter prompt text
4. Adjust token slider (50-1000)
5. Click "Generate"
6. Copy result with copy button

---

## Architecture Overview

```
Frontend (Vue 3 + Vite) ──HTTP/REST──> Backend (Hono)
   ↓                                        ↓
Input Validation                    Input Validation
UI Components                       Hugging Face API
State Management                    Error Handling
Copy-to-Clipboard              Response Formatting
```

### Data Flow

1. **User Input** → Frontend collects prompt & token count
2. **Validation** → Frontend validates before sending
3. **API Request** → POST request to `/api/generate`
4. **Backend Processing** → Backend validates, calls Hugging Face
5. **AI Generation** → HF Router processes via DeepSeek-V3.2
6. **Response** → Backend returns generated text
7. **Display** → Frontend shows result with copy option

---

## Environment Variables Reference

```env
# REQUIRED
HF_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxx    # Your Hugging Face API token

# OPTIONAL
PORT=3000                                  # Backend server port (default: 3000)
NODE_ENV=development                       # Environment (development/production)
```

**Environment Loading:**
- Backend loads from `.env` file in project root
- Never commit `.env` to version control
- Add to `.gitignore` (already configured)

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Connection refused (3000)** | Backend not running | Run `bun run dev` in project root |
| **Frontend can't reach backend** | CORS error or wrong URL | Check backend running, frontend points to localhost:3000 |
| **API returns 401 error** | Invalid HF token | Verify `HF_API_KEY` in `.env` file |
| **"Prompt required" error** | Empty prompt submitted | Enter text in prompt field |
| **Token slider not working** | Frontend issue | Check console for errors, refresh page |

---

## Development Tools & Commands

```bash
# Run tests (if test suite exists)
bun test

# Format code (if prettier configured)
bun run format

# Lint TypeScript
bun run lint

# Build for deployment
bun run build
```

---

## Deployment Considerations

- ✅ **Environment Variables** — Set `HF_API_KEY` on hosting platform
- ✅ **CORS Configuration** — Backend allows frontend origin
- ✅ **Error Handling** — All errors logged and returned gracefully
- ✅ **Rate Limiting** — Respect HF API rate limits (200 req/min free tier)
- ✅ **Frontend Build** — Vite creates optimized bundle in `dist/`

---

## Technology Stack Details

### Backend
- **Framework:** Hono (lightweight REST API)
- **Language:** TypeScript
- **Runtime:** Bun (or Node.js)
- **External API:** Hugging Face Inference API

### Frontend
- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite (HMR, fast bundling)
- **HTTP Client:** Axios
- **Styling:** CSS3

---

## Key Source Files

- [src/index.ts](src/index.ts) — Hono server initialization & CORS
- [src/routes/generate.ts](src/routes/generate.ts) — Paragraph generation endpoint
- [src/services/hf.ts](src/services/hf.ts) — Hugging Face API integration
- [src/types/index.ts](src/types/index.ts) — TypeScript interfaces
- [frontend/src/App.vue](frontend/src/App.vue) — Main Vue component

---

## Resources & Links

- 📚 [Hono Framework Docs](https://hono.dev)
- 📚 [Vue 3 Guide](https://vuejs.org)
- 📚 [Hugging Face API](https://huggingface.co/docs/api-inference/index)
- 📚 [Vite Documentation](https://vitejs.dev)
- 📚 [Bun Official Site](https://bun.sh)

---

## Support & Questions

- Check existing issues on repository
- Verify `.env` setup matches prerequisites
- Ensure both servers are running
- Check browser console for frontend errors
- Check terminal for backend errors

---

**Last Updated:** January 30, 2026 | **Status:** ✅ Production Ready