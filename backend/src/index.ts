import { Hono } from 'hono';
import { cors } from 'hono/cors';
import generate from './routes/generate';

const app = new Hono();

// FIX: Update CORS to allow Vercel
app.use('/*', cors({
  origin: [
    'https://cactus-pen.onrender.com',
    'https://cactus-pen.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Health check
app.get('/', (c: any) => {
  const hfKeyLoaded = !!process.env.HF_API_KEY;
  return c.json({
    status: 'ok',
    message: 'AI Paragraph Writer Backend',
    hf_api_key_loaded: hfKeyLoaded,
    timestamp: new Date().toISOString()
  });
});

// ULTRA-MINIMAL HEAD-only health endpoint for UptimeRobot
// HEAD requests have NO response body = maximum performance
app.head('/health', (c: any) => {
  // HEAD method: return headers only, no body
  return c.body(null, 200, {
    'X-Health-Check': 'alive'
  });
});

// Mount the generate route
app.route('/api', generate);

// Start server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

console.log(`Server starting on port ${port}...`);
console.log(`HF_API_KEY loaded: ${!!process.env.HF_API_KEY}`);
console.log(`Health endpoint: HEAD /health`);

// Export the app for Bun to serve
export default {
  port,
  fetch: app.fetch,
};