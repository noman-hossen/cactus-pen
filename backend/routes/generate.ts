import { Hono } from 'hono';
import { hfService } from '../services/hf';

const app = new Hono();

app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    
    // Accept both "topic" and "prompt" for compatibility
    const topic = body.topic || body.prompt;
    const { contentType = 'paragraph', tone = 'academic', wordCount = 100 } = body;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return c.json(
        { success: false, message: 'Topic is required' },
        400
      );
    }

    console.log(`Generating ${contentType} about: "${topic}"`);

    // Promt
    const prompt = `write a ${contentType} about ${topic} around ${wordCount} words in a ${tone} tone`;

    console.log('Sending prompt to AI:', prompt);
    
    // Estimate tokens (approx 1.3 tokens per word)
    const maxTokens = Math.ceil(wordCount * 1.3);
    
    const result = await hfService.generate(prompt, undefined, maxTokens);

    return c.json({
      success: true,
      result: result,
      prompt: prompt, // For debugging
      metadata: {
        contentType,
        tone,
        wordCount,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Generate route error:', error);
    return c.json(
      { 
        success: false, 
        message: error.message || 'Failed to generate content'
      }, 
      500
    );
  }
});

export default app;