import { config } from 'dotenv';
config();

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import generate from './routes/generate';
import { keyManager } from './utils/keyManager';

const app = new Hono();

// CORS configuration
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

// Enhanced health check with API key status
app.get('/', (c: any) => {
  const stats = keyManager.getStatistics();
  
  const hfKeysString = process.env.HF_API_KEYS || process.env.HF_API_KEY || '';
  const keyCount = hfKeysString ? 
    hfKeysString.split(',').filter(k => k.trim().length > 0).length : 0;
  
  return c.json({
    status: 'ok',
    message: 'AI Paragraph Writer Backend - Multi-API Key Support',
    version: '1.1.0',
    timestamp: new Date().toISOString(),
    api_keys: {
      configured: keyCount,
      loaded: stats.totalKeys,
      available: stats.availableKeys,
      success_rate: `${Math.round(stats.successRate * 100) / 100}%`,
      environment_variable: process.env.HF_API_KEYS ? 'HF_API_KEYS' : 
                           process.env.HF_API_KEY ? 'HF_API_KEY' : 'Not set',
    },
    endpoints: {
      generate: 'POST /api/generate',
      key_status: 'GET /api/keys/status',
      health: 'GET /health',
    }
  });
});

// Simple health check for load balancers
app.get('/health', (c: any) => {
  if (c.req.method === 'HEAD') {
    return new Response(null, { status: 200 });
  }
  
  const stats = keyManager.getStatistics();
  const isHealthy = stats.totalKeys > 0 && stats.availableKeys > 0;
  
  return c.json({
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    api_keys: {
      total: stats.totalKeys,
      available: stats.availableKeys,
    },
    uptime: process.uptime(),
  });
});

// Mount routes
app.route('/api', generate);

// Start server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const stats = keyManager.getStatistics();

console.log(`🚀 Server starting on port ${port}...`);
console.log(`📊 API Keys: ${stats.totalKeys} total, ${stats.availableKeys} available`);
console.log(`🌐 Health endpoint: GET /health`);
console.log(`🔑 Key status endpoint: GET /api/keys/status`);

// Export the app
export default {
  port,
  fetch: app.fetch,
};