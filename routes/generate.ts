import { Hono } from 'hono';
import { HuggingFaceService } from '../services/hf';
import type { GenerateRequest, GenerateResponse, ErrorResponse } from '../types';

const generateRoute = new Hono();
const hfService = new HuggingFaceService();

generateRoute.post('/api/generate', async (c) => {
  try {
    const body = await c.req.json<GenerateRequest>();

    // Validate request
    if (!body.prompt) {
      return c.json<ErrorResponse>({
        success: false,
        error: 'Prompt is required'
      }, 400);
    }

    // Generate text
    const result = await hfService.generateText(body);

    return c.json<GenerateResponse>({
      success: true,
      result
    });

  } catch (error) {
    console.error('Generation error:', error);

    // Return appropriate error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return c.json<ErrorResponse>({
      success: false,
      error: errorMessage.includes('Hugging Face API') 
        ? 'Upstream provider error' 
        : errorMessage
    }, errorMessage.includes('Prompt is required') ? 400 : 500);
  }
});

export { generateRoute };