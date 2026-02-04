import { Hono } from 'hono';
import { cors } from 'hono/cors';
import generate from './routes/generate';

const app = new Hono();

// Enable CORS
app.use('/*', cors({
  origin: ['https://cactus-pen.onrender.com'],
  allowHeaders: ['Content-Type'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Health check
app.get('/ping', (c: any) => {
  const hfKeyLoaded = !!process.env.HF_API_KEY;
  return c.json({
    status: 'ok',
    message: 'AI Paragraph Writer Backend',
    hf_api_key_loaded: hfKeyLoaded,
    timestamp: new Date().toISOString()
  });
});


app.route('/api', generate);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

console.log(`Server starting on port ${port}...`);
console.log(`HF_API_KEY loaded: ${!!process.env.HF_API_KEY}`);

// Export the app for Bun to serve
export default {
  port,
  fetch: app.fetch,
};