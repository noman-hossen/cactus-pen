import { Hono } from 'hono';
import { cors } from 'hono/cors';
import generate from './routes/generate';

const app = new Hono();

// Enable CORS
app.use('/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  allowHeaders: ['Content-Type'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Health check
app.get('/', (c) => {
  const hfKeyLoaded = !!process.env.HF_API_KEY;
  return c.json({
    status: 'ok',
    message: 'AI Paragraph Writer Backend',
    hf_api_key_loaded: hfKeyLoaded,
    timestamp: new Date().toISOString()
  });
});

// Mount the generate route
app.route('/api', generate);

// Start server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

console.log(`Server starting on port ${port}...`);
console.log(`HF_API_KEY loaded: ${!!process.env.HF_API_KEY}`);

// Export the app for Bun to serve
export default {
  port,
  fetch: app.fetch,
};