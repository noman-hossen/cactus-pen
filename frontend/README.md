# AI Paragraph Writer - Frontend

A modern Vue 3 web interface for AI-powered paragraph generation. This frontend connects to a backend API to create natural language content using the DeepSeek-V3.2 model via Hugging Face Router.

## Quick Overview

| Aspect | Details |
|--------|---------|
| **Purpose** | Generate AI paragraphs with custom prompts and length control |
| **Framework** | Vue 3 (Composition API) + Vite |
| **Build Tool** | Vite (lightning-fast dev server & HMR) |
| **Backend Dependency** | Hono server on `http://localhost:3000` |
| **UI Features** | Real-time generation, token slider, copy-to-clipboard |

## Core Features

- ✅ **AI Paragraph Generation** — Powered by DeepSeek-V3.2 via Hugging Face
- ✅ **Token Control Slider** — Adjust output length (50-1000 tokens)
- ✅ **Copy-to-Clipboard** — One-click paragraph copying
- ✅ **Real-time Feedback** — Loading states, error messages, success indicators
- ✅ **Responsive Design** — Optimized for desktop, tablet, and mobile
- ✅ **Error Handling** — User-friendly error messages with recovery
- ✅ **Modern UI** — Clean interface with visual feedback
- ✅ **Hot Module Replacement (HMR)** — Instant code updates during development

## Technology Stack
- **Vue 3** — Progressive JavaScript framework
- **Vite** — Fast build tool and development server
- **Axios** — HTTP client for API communication
- **CSS** — Custom styling

## Project Structure
```
frontend/
├── src/
│   ├── App.vue                       # Main app component with UI
│   │   ├── Input section (textarea)
│   │   ├── Token slider control
│   │   ├── Generate button
│   │   └── Result display with copy button
│   ├── components/
│   │   └── ParagraphGenerator.vue    # Reusable generator component
│   ├── views/
│   │   └── HomeView.vue              # Home page view
│   ├── main.js                       # Vue app entry point
│   └── style.css                     # Global and component styles
├── public/                           # Static assets
├── index.html                        # HTML entry point
├── vite.config.js                    # Vite configuration
├── jsconfig.json                     # JavaScript config
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## Technology Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Vue 3** | Frontend framework | ^3.4.x |
| **Vite** | Build tool & dev server | ^5.x |
| **Axios** | HTTP client | Latest |
| **CSS3** | Styling & responsive design | Native |
| **JavaScript ES6+** | Runtime | Node.js/Bun compatible |

---

## Project Structure & Components

```
frontend/
├── src/                                      ← Source code
│   ├── App.vue                               ✓ Main app container
│   │   ├── Input textarea (prompt)
│   │   ├── Token range slider (50-1000)
│   │   ├── Generate button
│   │   └── Output display with actions
│   ├── main.js                               ✓ Vue 3 app initialization
│   ├── style.css                             ✓ Global styles & responsive design
│   ├── components/
│   │   ├── ParagraphGenerator.vue            ✓ Reusable generator component
│   │   ├── FeatureCard.vue                   ✓ Feature showcase cards
│   │   ├── FeaturesSection.vue               ✓ Features grid section
│   │   ├── GeneratorSection.vue              ✓ Generator container layout
│   │   ├── AppHeader.vue                     ✓ Header/navigation
│   │   ├── AppFooter.vue                     ✓ Footer section
│   │   └── Dropdown.vue                      ✓ Dropdown UI component
│   ├── views/
│   │   └── HomeView.vue                      ✓ Home page layout
│   ├── assets/                               ✓ Images, icons, static files
│   └── utils/
│       ├── api.js                            ✓ API communication utilities
│       └── pdfExporter.js                    ✓ PDF export functionality
│
├── public/                                   ✓ Static assets (favicon, etc)
├── index.html                                ✓ HTML entry point
├── vite.config.js                            ✓ Vite build configuration
├── jsconfig.json                             ✓ JavaScript config (path aliases)
├── package.json                              ✓ Dependencies & npm scripts
└── README.md                                 ← This file
```

---

## Prerequisites

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **Node.js** | v16.x | v18+ or Bun |
| **Runtime** | npm/yarn | Bun (faster) |
| **Backend** | Running locally | `http://localhost:3000` |
| **Browser** | Modern (ES6+) | Chrome/Firefox/Safari latest |

**Important:** Backend server must be running before using the frontend.

---

## Installation & Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

**Using Bun (Recommended):**
```bash
bun install
```

**Using npm:**
```bash
npm install
```

### Step 3: Start Development Server

**Using Bun:**
```bash
bun run dev
```

**Using npm:**
```bash
npm run dev
```

**Output:**
```
  Local:   http://localhost:5173/
  Press 'q' to stop the server
  HMR enabled - edits will refresh instantly
```

### Step 4: Open in Browser

Navigate to `http://localhost:5173` in your web browser. The page will auto-reload when you make changes.

---

## Available Commands

```bash
# Development server with HMR (hot reload)
bun run dev
npm run dev

# Build for production (creates dist/ folder)
bun run build
npm run build

# Preview production build locally
bun run preview
npm run preview

# Optional: Format code (if prettier is installed)
bun run format
npm run format

# Optional: Lint code (if eslint is configured)
bun run lint
npm run lint
```

---

## How the Frontend Works

### User Workflow

```
┌─────────────────────────────────────────────┐
│  1. User enters prompt in textarea          │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│  2. User adjusts token slider (50-1000)    │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│  3. User clicks "Generate" button           │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│  4. Frontend validates input                │
│     - Prompt cannot be empty                │
│     - Token range: 50-1000                  │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│  5. POST request sent to backend            │
│     http://localhost:3000/api/generate     │
└─────────────┬───────────────────────────────┘
              │
        ┌─────▼─────┐
        │  WAITING  │  Loading spinner shown
        │ (2-5 sec) │
        └─────┬─────┘
              │
┌─────────────▼───────────────────────────────┐
│  6. Response received from backend          │
│     - Error: Show error message             │
│     - Success: Display generated paragraph  │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│  7. User can:                               │
│     - Copy paragraph (copy button)          │
│     - Generate another (modify & regenerate)│
│     - Export to PDF (if available)          │
└─────────────────────────────────────────────┘
```

### API Communication

#### Request Format

```javascript
// POST http://localhost:3000/api/generate
{
  "prompt": "Write about artificial intelligence",
  "max_tokens": 300
}
```

#### Success Response (200)

```json
{
  "success": true,
  "result": "Artificial intelligence (AI) has emerged as one of the most transformative technologies...",
  "tokens_used": 287
}
```

#### Error Response (4xx/5xx)

```json
{
  "success": false,
  "error": "Generation failed",
  "message": "Hugging Face API rate limit exceeded. Try again in 1 minute."
}
```

---

## Component Architecture

### App.vue (Main)
- Form state management
- API call handling  
- Result display & error handling
- Copy-to-clipboard functionality

### ParagraphGenerator.vue
- Reusable generator component
- Can be used in multiple places
- Encapsulates generation logic

### UI Components
- **AppHeader.vue** — Navigation & branding
- **AppFooter.vue** — Links & info
- **FeatureCard.vue** — Individual feature display
- **FeaturesSection.vue** — Feature grid
- **GeneratorSection.vue** — Generator container
- **Dropdown.vue** — Reusable dropdown UI

### Utility Modules
- **api.js** — Axios instance & API calls
- **pdfExporter.js** — PDF generation helpers

---

## Configuration

### Backend URL

Edit [src/utils/api.js](src/utils/api.js) to change backend URL:

```javascript
// Default: http://localhost:3000
const API_BASE_URL = 'http://localhost:3000';

// For production: 
// const API_BASE_URL = 'https://api.yourdomain.com';
```

### Vite Config

See [vite.config.js](vite.config.js) for build options:

```javascript
// Default port: 5173
// Default preview port: 4173
```

### Environment Variables (Optional)

Create `.env.local` for development:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **"Backend not responding"** | Backend server not running | Start backend: `cd .. && bun run dev` |
| **CORS error in console** | Frontend-backend origin mismatch | Verify backend CORS config, check ports |
| **Prompt submission doesn't work** | Empty prompt or validation failed | Enter text in prompt field before submitting |
| **Button stays loading forever** | Backend timeout or network issue | Check backend logs, refresh page, try again |
| **Changes don't appear** | HMR not working | Hard refresh browser (Ctrl+Shift+R) |
| **"Failed to fetch" error** | Backend URL incorrect or server down | Check browser console, verify `api.js` URL |

---

## Development Workflow

### During Development

1. **Backend Terminal:** `bun run dev` (runs on port 3000)
2. **Frontend Terminal:** `bun run dev` (runs on port 5173)
3. **Edit Code** → Browser auto-refreshes (HMR)
4. **Open DevTools** (F12) to see console errors

### Building for Production

```bash
# Create optimized production build
bun run build

# Outputs optimized files to dist/
# dist/index.html          — HTML file
# dist/js/                 — Bundled & minified JavaScript
# dist/css/                — Bundled & minified CSS
# dist/assets/             — Optimized images
```

### Deploying to Production

1. Run `bun run build`
2. Upload `dist/` folder to web hosting
3. Update `api.js` with production backend URL
4. Serve files with web server (nginx, Apache, etc)

---

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| IE | 11 | ❌ Not supported |

---

## Performance Tips

- ✅ Token slider limited to 1000 (prevents timeouts)
- ✅ Input validation before API calls (reduces backend load)
- ✅ Loading states prevent duplicate submissions
- ✅ Vite minification reduces bundle size
- ✅ CSS optimized for fast rendering

---

## Recommended IDE Setup

- **[VS Code](https://code.visualstudio.com/)** + **[Vue Official Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)**
- Disable Vetur extension if you have it installed
- Install **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** for linting
- Install **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** for formatting

---

## Resources & Documentation

- 📚 [Vue 3 Official Docs](https://vuejs.org)
- 📚 [Vite User Guide](https://vitejs.dev)
- 📚 [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- 📚 [Axios Documentation](https://axios-http.com)
- 📚 [HTML/CSS/JavaScript MDN](https://developer.mozilla.org)

---

## Troubleshooting Checklist

Before reporting issues:
- ✅ Backend server running on port 3000?
- ✅ Frontend server running on port 5173?
- ✅ Browser showing no console errors (F12)?
- ✅ Dependencies installed (`bun install`)?
- ✅ Tried hard refresh (Ctrl+Shift+R)?

---

## Related Documentation

- **Backend Setup:** See [../README.md](../README.md) for server configuration
- **API Documentation:** See [../README.md#api-documentation](../README.md#api-documentation) for endpoints
- **Full Project:** See [../README.md](../README.md) for complete architecture

---

**Last Updated:** January 30, 2026 | **Status:** ✅ Production Ready | **Maintained By:** AI Paragraph Writer Team

## Troubleshooting
- **CORS errors:** Ensure the backend is running and CORS is enabled.
- **Connection refused:** Verify the backend is running on `http://localhost:3000`.
- **Build fails:** Clear `node_modules/` and `.vite/`, then reinstall dependencies.

## License
See the project root for licensing details.

---

For more details, see [Vite Configuration Reference](https://vite.dev/config/).
