# AI Paragraph Writer — Frontend

A Vue 3 web interface for generating AI-powered paragraphs. This frontend communicates with the backend API to generate natural-language content using Hugging Face Router.

## Features
- **AI Paragraph Generation** using DeepSeek-V3.2 via Hugging Face Router
- **Token Control Slider** — Adjust output length from 50 to 1000 tokens
- **Copy to Clipboard** — Quickly copy generated paragraphs
- **Real-time Feedback** — Loading states, error messages, and success indicators
- **Responsive Design** — Works on desktop and mobile devices
- **Error Handling** — User-friendly error messages and validation
- **Modern UI** — Clean, intuitive interface with visual feedback

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

## Requirements
- Node.js (v16+) or Bun
- A running backend service at `http://localhost:3000`

## Installation & Setup

### Install Dependencies
```bash
bun install
# or
npm install
```

### Development Server
Start the development server with hot module replacement (HMR):

```bash
bun run dev
# or
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default).

### Build for Production
```bash
bun run build
# or
npm run build
```

Generates optimized production build in the `dist/` directory.

### Preview Production Build
```bash
bun run preview
# or
npm run preview
```

## How It Works

### User Flowcommunicates with the backend at `http://localhost:3000` via the `/api/generate` endpoint.

### Request
```javascript
fetch('http://localhost:3000/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "Your prompt text",
    model: "deepseek-ai/DeepSeek-V3.2:novita",  // optional
    max_tokens: 300                              // optional
  })
})
```

### Success Response
```json
{
  "success": true,
  "result": "Generated paragraph text..."
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Configuration

### Backend URL
Default: `http://localhost:3000`

To use a different backend, check `src/App.vue` or the component files for the `API_BASE_URL` variable and update it accordingly. In development, it can be configured via environment variables using `import.meta.env.VITE_API_URL`.

### Environment Variables
Create a `.env.local` file for development (optional):
```
VITE_API_URL=http://your-backend-url:3000
```

**Response:**
```json

### Full Stack Development
1. **Terminal 1 — Backend**
   ```bash
   # In project root
   bun install
   bun run dev
   ```
   Backend runs on `http://localhost:3000`

2. **Terminal 2 — Frontend**
   ```bash
   # In project root/frontend
   bun install
   bun run dev
   ```
   Frontend runs on `http://localhost:5173`

3. **Open in Browser**
   Navigate to `http://localhost:5173` to use the application

### Auto-Reload
- **Backend:** Changes trigger automatic reload via Bun's `--watch` flag
- **Frontend:** Vite provides instant HMR (Hot Module Replacement) for all Vue components and styles

### Testing Components
- `App.vue` — Main UI component with full generation workflow
- `ParagraphGenerator.vue` — Standalone component for modular use

## Technology Stack

### Production Dependencies
- **vue** ^3.4.0 — Progressive JavaScript framework
- **axios** ^1.6.0 — Promise-based HTTP client

### Dev Dependencies
- **@vitejs/plugin-vue** ^5.0.0 — Vue 3 support for Vite
- **vite** ^5.0.0 — Next generation build tool

## Component Details

### App.vue
- **Purpose:** Main application interface
- **Features:**
  - Textarea for prompt input
  - Range slider for token control (50-1000)
  - Generate button with loading state
  - Result display with copy functionality
  - Error message display
  - Responsive layout

### ParagraphGenerator.vue
- **Purpose:** Reusable generator component
- **Features:**
  - Encapsulated state and logic
  - Advanced options toggle
  - Copy to clipboard functionality
  - Loading spinner
  - Error handling

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- **Chromium-based browsers** (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- **Firefox**:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Troubleshooting

### Connection Issues
- **CORS errors:** Ensure backend is running with CORS enabled (default in `src/index.ts`)
- **Connection refused:** Verify backend is running: `bun run dev` in root directory
- **Port already in use:** Change frontend port or kill existing process

### Build Issues
- **Clear cache:** `rm -r node_modules .vite && bun install`
- **Vite config:** Check `vite.config.js` for plugin issues
- **Module errors:** Ensure all imports use correct paths

### Development Issues
- **HMR not working:** Check Vite version compatibility
- **Stale cache:** Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- **Component not updating:** Ensure `ref()` is used for reactive propertiesormatters)
- **Firefox**:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Troubleshooting
- **CORS errors:** Ensure the backend is running and CORS is enabled.
- **Connection refused:** Verify the backend is running on `http://localhost:3000`.
- **Build fails:** Clear `node_modules/` and `.vite/`, then reinstall dependencies.

## License
See the project root for licensing details.

---

For more details, see [Vite Configuration Reference](https://vite.dev/config/).
