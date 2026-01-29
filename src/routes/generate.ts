import { Hono } from 'hono';
import { hfService } from '../services/hf';

// Create a new Hono app for this route
const app = new Hono();

app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    const { prompt, model, max_tokens } = body;

    // Validation
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return c.json(
        { success: false, message: 'Prompt is required and must be a non-empty string' },
        400
      );
    }

    console.log(`Generating with prompt: "${prompt.substring(0, 50)}..."`);

    const result = await hfService.generate(
      prompt.trim(),
      model,
      max_tokens
    );

    return c.json({
      success: true,
      result: result,
    });

  } catch (error: any) {
    console.error('Generate route error:', error);

    // Check if it's a validation error
    if (error.message.includes('required') || error.message.includes('Prompt')) {
      return c.json(
        { success: false, message: error.message },
        400
      );
    }

    // Check if it's a Hugging Face error
    if (error.message.includes('HF Error')) {
      return c.json(
        { 
          success: false, 
          message: 'Failed to generate paragraph',
          error: error.message 
        },
        500
      );
    }

    return c.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      500
    );
  }
});

// Export as default
export default app;